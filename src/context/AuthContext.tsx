"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  totalFavorites?: number;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        const normalized = normalizeUser(parsed);
        setIsLoggedIn(true);
        setUser(normalized);
        localStorage.setItem("user", JSON.stringify(normalized));
      } catch {}
    }
  }, [mounted]);

  const normalizeUser = (u: Partial<User>): User => {
    const fullName = u.fullName || [u.firstName, u.lastName].filter(Boolean).join(" ").trim();
    return { 
      email: u.email || "", 
      totalFavorites: u.totalFavorites, 
      fullName, 
      firstName: u.firstName, 
      lastName: u.lastName,
      role: u.role || 'user'
    } as User;
  };

  const login = (rawUser: User, token: string) => {
    const normalized = normalizeUser(rawUser);
    setIsLoggedIn(true);
    setUser(normalized);
    if (typeof window !== 'undefined') {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(normalized));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
