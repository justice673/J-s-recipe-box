'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Search, Filter, Trash2, Eye, Star, ThumbsUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import Loader from '@/components/Loader';
import ButtonLoader from '@/components/ButtonLoader';
import AdminPagination from '@/components/AdminPagination';
import Image from 'next/image';
import Link from 'next/link';
import { apiUrl } from '@/lib/api';

interface Review {
  _id: string;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
  };
  recipe: {
    _id: string;
    title: string;
    images: string[];
  };
}

export default function AdminReviews() {
  const { isLoggedIn } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isLoggedIn) return;
    fetchReviews();
  }, [mounted, isLoggedIn, searchTerm, ratingFilter, currentPage]);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(ratingFilter && { rating: ratingFilter })
      });

      const response = await fetch(apiUrl(`api/admin/reviews?${queryParams}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(reviewId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl(`api/admin/reviews/${reviewId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      // Remove from local state
      setReviews(reviews.filter(review => review._id !== reviewId));
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    } finally {
      setDeleteLoading(null);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!mounted) {
    return <Loader />;
  }

  if (loading && reviews.length === 0) {
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
              Review Management
            </h1>
            <p className="text-gray-600 font-outfit">
              Manage all reviews and ratings on the platform
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
                placeholder="Search reviews..."
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
              value={ratingFilter}
              onChange={(e) => {
                setRatingFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <div className="flex items-center gap-2 text-sm text-gray-600 font-outfit">
              <Filter className="w-4 h-4" />
              Showing {reviews.length} reviews
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                {/* Review Header */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Recipe Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={review.recipe.images[0] || 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=100&h=100&fit=crop'}
                      alt={review.recipe.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Review Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        href={`/recipes/${review.recipe._id}`}
                        className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors font-caveat"
                      >
                        {review.recipe.title}
                      </Link>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-600 font-outfit">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>

                    {/* Reviewer Info */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {review.user.fullName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 font-outfit">
                          {review.user.fullName}
                        </p>
                        <p className="text-xs text-gray-500 font-outfit">
                          {review.user.email}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 font-outfit">
                        • {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Review Comment */}
                    <p className="text-gray-700 mb-3 font-outfit leading-relaxed">
                      {review.comment}
                    </p>

                    {/* Review Stats */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500 font-outfit">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.helpful} helpful</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/recipes/${review.recipe._id}`}
                    className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                    title="View Recipe"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    disabled={deleteLoading === review._id}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                    title="Delete Review"
                  >
                    {deleteLoading === review._id ? (
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

        {reviews.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            <p className="text-gray-500 font-outfit">No reviews found</p>
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
