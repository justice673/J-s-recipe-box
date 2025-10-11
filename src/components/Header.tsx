'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Search, User, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Generate user initials for profile picture
  const userInitials = React.useMemo(() => {
    if (!user) return '';
    if (user.fullName) {
      const parts = user.fullName.trim().split(/\s+/);
      if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if (user.firstName && user.lastName) return (user.firstName[0] + user.lastName[0]).toUpperCase();
    if (user.firstName) return user.firstName.slice(0,2).toUpperCase();
    return '';
  }, [user]);

  useEffect(() => {
    // Update favorite count from user context
    if (isLoggedIn && user?.totalFavorites !== undefined) {
      setFavoriteCount(user.totalFavorites);
    } else {
      setFavoriteCount(0);
    }
  }, [isLoggedIn, user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="flex justify-between items-center">
        
        {/* Left: Site Name */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="J's Recipe Box Logo" 
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent cursor-pointer" style={{ fontFamily: 'Caveat, cursive' }}>
              J&apos;s Recipe Box
            </h2>
          </div>
        </Link>
        
        {/* Center: View Recipes - Desktop */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <Link href="/recipes" className="text-white hover:text-green-300 transition-colors" style={{ fontFamily: 'Caveat, cursive' }}>
            <span className="text-xl font-bold">View Recipes</span>
          </Link>
        </div>
        
        {/* Right: Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all w-64 text-sm"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            />
          </form>
          
          {/* Desktop Auth Section */}
          <div className="flex gap-4 items-center">
            {isLoggedIn ? (
              /* Profile Dropdown */
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-white hover:text-green-300 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white/30" style={{ fontFamily: 'Caveat, cursive', color: '#fff' }}>
                    {userInitials || <User className="w-4 h-4" />}
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white  shadow-lg py-2 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors border-t"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left border-t"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login/Signup Buttons */
              <>
                <Link href="/login">
                  <button className="text-white px-3 md:px-6 py-2 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-white/30" style={{ fontFamily: 'Caveat, cursive' }}>
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-6 py-2 transition-all duration-300" style={{ fontFamily: 'Caveat, cursive' }}>
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
          
          {/* Favorites Icon with Count */}
          <Link href="/profile" className="relative bg-transparent border border-white/30 p-2 backdrop-blur-sm rounded hover:bg-white/10 transition-colors">
            <Heart className="w-5 h-5 text-green-400" fill="currentColor" />
            {/* Badge */}
            {isLoggedIn && favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white/30" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {favoriteCount}
              </span>
            )}
          </Link>
        </div>
        
        {/* Mobile: Hamburger Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Favorites */}
          <Link href="/profile" className="relative bg-transparent border border-white/30 p-2 backdrop-blur-sm rounded hover:bg-white/10 transition-colors">
            <Heart className="w-4 h-4 text-green-400" fill="currentColor" />
            {isLoggedIn && favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full px-1 py-0.5 border border-white/30" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {favoriteCount}
              </span>
            )}
          </Link>
          {/* Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 hover:bg-white/10 backdrop-blur-sm transition-colors border border-white/30 rounded"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={closeMobileMenu} />
      )}
      
      {/* Mobile Menu Slide-out */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out z-50 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
              Menu
            </h3>
            <button onClick={closeMobileMenu} className="text-gray-600 hover:text-gray-800 p-1">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200  text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            />
          </form>
          
          {/* Navigation Links */}
          <div className="space-y-4 mb-8">
            <Link 
              href="/recipes" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              <Search className="w-5 h-5" />
              <span>View Recipes</span>
            </Link>
          </div>
          
          {/* Auth Section */}
          <div className="border-t border-gray-200 pt-6">
            {isLoggedIn ? (
              <div className="space-y-4">
                <Link
                  href="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 text-gray-800 hover:text-green-600 transition-colors text-lg"
                  style={{ fontFamily: 'Caveat, cursive' }}
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {userInitials || <User className="w-4 h-4" />}
                  </div>
                  <span>Profile</span>
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-gray-800 hover:text-green-600 transition-colors text-lg"
                    style={{ fontFamily: 'Caveat, cursive' }}
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-gray-800 hover:text-red-600 transition-colors text-lg w-full text-left"
                  style={{ fontFamily: 'Caveat, cursive' }}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Link href="/login" onClick={closeMobileMenu}>
                  <button className="w-full text-gray-800 border border-gray-300 px-6 py-3 hover:bg-gray-50 transition-all duration-300 text-lg " style={{ fontFamily: 'Caveat, cursive' }}>
                    Sign In
                  </button>
                </Link>
                <Link href="/signup" onClick={closeMobileMenu}>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 transition-all duration-300 text-lg " style={{ fontFamily: 'Caveat, cursive' }}>
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
