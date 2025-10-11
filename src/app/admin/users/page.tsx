'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Search, Filter, MoreVertical, UserCheck, UserX, Shield, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import Loader from '@/components/Loader';
import ButtonLoader from '@/components/ButtonLoader';
import AdminPagination from '@/components/AdminPagination';
import { apiUrl } from '@/lib/api';
import AdminTable from '@/components/AdminTable';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  recipeCount: number;
  reviewCount: number;
}

export default function AdminUsers() {
  const { isLoggedIn } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const columns = [
    {
      key: 'user',
      header: 'User',
      render: (user: User) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {user.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 font-outfit">
              {user.fullName}
            </div>
            <div className="text-sm text-gray-500 font-outfit">
              {user.email}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      render: (user: User) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          user.role === 'admin' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {user.role === 'admin' ? 'Administrator' : 'User'}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (user: User) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          user.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'activity',
      header: 'Activity',
      render: (user: User) => (
        <div className="space-y-1 text-sm text-gray-500 font-outfit">
          <div>{user.recipeCount} recipes</div>
          <div>{user.reviewCount} reviews</div>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Joined',
      render: (user: User) => (
        <div className="text-sm text-gray-500 font-outfit">
          {new Date(user.createdAt).toLocaleDateString()}
        </div>
      ),
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: User) => (
        <div className="flex items-center justify-end gap-2">
          {user.role !== 'admin' && (
            <button
              onClick={() => handleMakeAdmin(user._id)}
              disabled={actionLoading === user._id}
              className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors"
              title="Make Admin"
            >
              {actionLoading === user._id ? (
                <ButtonLoader />
              ) : (
                <Shield className="w-4 h-4" />
              )}
            </button>
          )}
          
          <button
            onClick={() => handleStatusToggle(user._id, user.isActive)}
            disabled={actionLoading === user._id}
            className={`p-2 transition-colors ${
              user.isActive 
                ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                : 'text-green-600 hover:text-green-700 hover:bg-green-50'
            }`}
            title={user.isActive ? 'Deactivate User' : 'Activate User'}
          >
            {actionLoading === user._id ? (
              <ButtonLoader />
            ) : user.isActive ? (
              <UserX className="w-4 h-4" />
            ) : (
              <UserCheck className="w-4 h-4" />
            )}
          </button>
        </div>
      ),
      className: 'text-right',
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(roleFilter && { role: roleFilter })
      });

      const response = await fetch(apiUrl(`api/admin/users?${queryParams}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, roleFilter]);

  // Single useEffect to handle all data fetching with debouncing for search
  useEffect(() => {
    if (!mounted || !isLoggedIn) return;

    // If there's a search term, debounce it
    if (searchTerm) {
      const debounceTimer = setTimeout(() => {
        fetchUsers();
      }, 500);
      return () => clearTimeout(debounceTimer);
    } else {
      // No search term, fetch immediately
      fetchUsers();
    }
  }, [mounted, isLoggedIn, fetchUsers, searchTerm]);

  const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
    setActionLoading(userId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl(`api/admin/users/${userId}/status`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      // Update local state
      setUsers(users.map(user => 
        user._id === userId 
          ? { ...user, isActive: !currentStatus }
          : user
      ));

      toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleMakeAdmin = async (userId: string) => {
    setActionLoading(userId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl(`api/admin/users/${userId}/admin`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to promote user to admin');
      }

      // Update local state
      setUsers(users.map(user => 
        user._id === userId 
          ? { ...user, role: 'admin' }
          : user
      ));

      toast.success('User promoted to admin successfully');
    } catch (error) {
      console.error('Error promoting user to admin:', error);
      toast.error('Failed to promote user to admin');
    } finally {
      setActionLoading(null);
    }
  };

  if (!mounted) {
    return <Loader />;
  }

  if (loading && users.length === 0) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
            <h1 className="text-3xl font-bold text-gray-800 font-caveat">
              User Management
            </h1>
            <p className="text-gray-600 font-outfit">
              Manage and monitor user accounts
            </p>
        </div>

        {/* Filters */}
                {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-outfit"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-outfit"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex items-center gap-2 text-sm text-gray-600 font-outfit">
              <Filter className="w-4 h-4" />
              Showing {users.length} users
            </div>
          </div>
        </div>

        {/* Users Table */}
        <AdminTable
          columns={columns}
          data={users}
          isLoading={loading && users.length === 0}
          emptyMessage="No users found"
        />

        {/* Pagination */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </AdminLayout>
  );
}
