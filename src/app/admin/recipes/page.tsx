'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Search, Filter, Trash2, Eye, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import Loader from '@/components/Loader';
import ButtonLoader from '@/components/ButtonLoader';
import AdminPagination from '@/components/AdminPagination';
import Image from 'next/image';
import Link from 'next/link';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  difficulty: string;
  averageRating: number;
  reviewCount: number;
  likes: number;
  createdAt: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
  };
}

export default function AdminRecipes() {
  const { isLoggedIn } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isLoggedIn) return;
    fetchRecipes();
  }, [mounted, isLoggedIn, searchTerm, categoryFilter, currentPage]);

  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(categoryFilter && { category: categoryFilter })
      });

      const response = await fetch(`http://localhost:5000/api/admin/recipes?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data.recipes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast.error('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (recipeId: string, recipeTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${recipeTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeleteLoading(recipeId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      // Remove from local state
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
      toast.success('Recipe deleted successfully');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast.error('Failed to delete recipe');
    } finally {
      setDeleteLoading(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [
    'appetizer', 'main-course', 'dessert', 'beverage', 'soup', 'salad',
    'side-dish', 'snack', 'breakfast', 'lunch', 'dinner'
  ];

  if (!mounted) {
    return <Loader />;
  }

  if (loading && recipes.length === 0) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 font-caveat">
              Recipe Management
            </h1>
            <p className="text-gray-600 font-outfit">
              Manage all recipes on the platform
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipes..."
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
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-sm text-gray-600 font-outfit">
              <Filter className="w-4 h-4" />
              Showing {recipes.length} recipes
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              {/* Recipe Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={recipe.images[0] || 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400&h=200&fit=crop'}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full capitalize">
                    {recipe.category.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-white text-xs font-semibold">
                    ★ {recipe.averageRating?.toFixed(1) || '0.0'}
                  </span>
                </div>
              </div>

              {/* Recipe Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 font-caveat">
                  {recipe.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-outfit">
                  {recipe.description}
                </p>

                {/* Author and Stats */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 font-outfit">
                      {recipe.user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 font-outfit">
                      {recipe.user.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800 font-outfit">
                      {recipe.likes} likes
                    </p>
                    <p className="text-xs text-gray-500 font-outfit">
                      {recipe.reviewCount} reviews
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center text-xs text-gray-500 mb-4 font-outfit">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(recipe.createdAt).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/recipes/${recipe._id}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 text-sm font-semibold transition-colors text-center flex items-center justify-center gap-1 font-outfit"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  <button
                    onClick={() => handleDeleteRecipe(recipe._id, recipe.title)}
                    disabled={deleteLoading === recipe._id}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 text-sm font-semibold transition-colors flex items-center justify-center font-outfit"
                  >
                    {deleteLoading === recipe._id ? (
                      <ButtonLoader />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recipes.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            <p className="text-gray-500 font-outfit">No recipes found</p>
          </div>
        )}

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
