'use client';

import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ChefHat, 
  MessageSquare, 
  LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface AdminSidebarProps {
  collapsed: boolean;
}

export default function AdminSidebar({ collapsed }: AdminSidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard size={20} />,
      active: pathname === '/admin'
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: <Users size={20} />,
      active: pathname === '/admin/users'
    },
    {
      label: 'Recipes',
      href: '/admin/recipes',
      icon: <ChefHat size={20} />,
      active: pathname === '/admin/recipes'
    },
    {
      label: 'Reviews',
      href: '/admin/reviews',
      icon: <MessageSquare size={20} />,
      active: pathname === '/admin/reviews'
    }
  ];

  return (
    <Sidebar 
      collapsed={collapsed}
      backgroundColor="#ffffff"
      width="256px"
      collapsedWidth="80px"
      rootStyles={{
        border: 'none',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="J's Recipe Box Logo" 
            className={`transition-all duration-300 ${
              collapsed ? 'w-8 h-8' : 'w-10 h-10'
            }`}
          />
          {!collapsed && (
            <h1 className="text-xl font-bold text-green-600 font-caveat">
              Recipe Admin
            </h1>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            backgroundColor: active ? '#f0fdf4' : 'transparent',
            color: active ? '#16a34a' : '#374151',
            borderRight: active ? '2px solid #16a34a' : 'none',
            fontFamily: 'var(--font-outfit)',
            fontSize: '14px',
            fontWeight: active ? '600' : '400',
            padding: '12px 24px',
            margin: '4px 0',
            '&:hover': {
              backgroundColor: '#f9fafb',
              color: '#16a34a',
            },
          }),
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.href}
            active={item.active}
            icon={item.icon}
            component={<Link href={item.href} />}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>

      {/* User Section at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
        {!collapsed && (
          <div className="flex items-center p-4">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.fullName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 font-outfit truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-600 font-outfit">Administrator</p>
            </div>
          </div>
        )}
        
        <Menu
          menuItemStyles={{
            button: {
              backgroundColor: 'transparent',
              color: '#dc2626',
              fontFamily: 'var(--font-outfit)',
              fontSize: '14px',
              padding: collapsed ? '12px' : '12px 24px',
              margin: '0',
              '&:hover': {
                backgroundColor: '#fef2f2',
                color: '#dc2626',
              },
            },
          }}
        >
          <MenuItem
            icon={<LogOut size={20} />}
            onClick={handleLogout}
          >
            {!collapsed && 'Logout'}
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
}
