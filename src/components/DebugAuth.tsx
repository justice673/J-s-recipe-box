'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function DebugAuth() {
  const { user, isLoggedIn } = useAuth();
  const [localStorageData, setLocalStorageData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    try {
      setLocalStorageData({
        user: userData ? JSON.parse(userData) : null,
        token: token || null,
        hasToken: !!token
      });
    } catch (e) {
      setLocalStorageData({ error: 'Failed to parse user data' });
    }
  }, [mounted, user]);

  const clearAuth = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-red-500 p-4 rounded-lg shadow-lg max-w-md text-sm z-50">
      <div className="mb-2 font-bold text-red-600">🐛 Auth Debug Panel</div>
      
      <div className="space-y-2">
        <div>
          <strong>Auth Context:</strong>
          <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
            {JSON.stringify({
              isLoggedIn,
              user: user,
            }, null, 2)}
          </pre>
        </div>
        
        <div>
          <strong>LocalStorage:</strong>
          <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
            {JSON.stringify(localStorageData, null, 2)}
          </pre>
        </div>
        
        <button
          onClick={clearAuth}
          className="w-full bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
        >
          Clear Auth Data & Reload
        </button>
      </div>
    </div>
  );
}
