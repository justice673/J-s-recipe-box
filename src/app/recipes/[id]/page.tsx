'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ChefHat, Heart, ArrowLeft, Star, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import Loader from '@/components/Loader';
import ButtonLoader from '@/components/ButtonLoader';
import { apiUrl } from '@/lib/api';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  image?: string; // Primary image field
  images: string[];
  time: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  serves: number;
  rating?: number;
  reviews?: number;
  averageRating?: number;
  ratingCount?: number;
  reviewCount?: number;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  author: {
    fullName: string;
    email: string;
  };
  createdAt: string;
  liked?: boolean;
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: {
    fullName: string;
    email: string;
  };
  createdAt: string;
}

interface RecipeDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default function RecipeDetailsPage({ params }: RecipeDetailsProps) {
  const { isLoggedIn, user } = useAuth();
  const resolvedParams = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [rateStatus, setRateStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [rateMessage, setRateMessage] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await fetch(apiUrl(`api/reviews/${resolvedParams.id}`));
      if (response.ok) {
        const data = await response.json();
        setReviews(Array.isArray(data) ? data : data.reviews || []);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setReviewsLoading(false);
    }
  };

  // Normalize recipe data to handle different field names from API
  const normalizeRecipe = (data: any): Recipe => {
    return {
      ...data,
      rating: data.averageRating ?? data.rating ?? 0,
      reviews: data.ratingCount ?? data.reviewCount ?? data.reviews ?? 0,
    };
  };

  // Fetch and update recipe data
  const fetchRecipeData = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(apiUrl(`api/recipes/${resolvedParams.id}`), {
        headers
      });

      if (response.ok) {
        const data = await response.json();
        setRecipe(normalizeRecipe(data));
        setIsLiked(data.liked || false);
      }
    } catch (err) {
      console.error('Error fetching recipe:', err);
    }
  };

  // Fetch recipe data
  useEffect(() => {
    if (!mounted) return;
    
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        };
        
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(apiUrl(`api/recipes/${resolvedParams.id}`), {
          headers
        });

        if (!response.ok) {
          throw new Error('Recipe not found');
        }

        const data = await response.json();
        setRecipe(normalizeRecipe(data));
        setIsLiked(data.liked || false);
        // Reset image errors when recipe changes
        setImageError(false);
        setThumbnailErrors(new Set());

        // Fetch similar recipes
        const similarResponse = await fetch(apiUrl(`api/recipes?category=${data.category}&limit=3`), {
          headers
        });
        
        if (similarResponse.ok) {
          const similarData = await similarResponse.json();
          setSimilarRecipes(similarData.recipes.filter((r: Recipe) => r._id !== resolvedParams.id).slice(0, 3));
        }

        // Fetch reviews
        await fetchReviews();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [resolvedParams.id, mounted]);

  // Handle like/unlike
  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error('Please log in to like recipes');
      return;
    }

    try {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl(`api/recipes/${resolvedParams.id}/like`), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to like recipe');
      }

      setIsLiked(!isLiked);
      toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
    } catch (err: unknown) {
      toast.error('Failed to update favorites');
    }
  };

  // Handle rating and review
  const handleRateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error('Please log in to write a review');
      return;
    }

    if (!reviewComment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setRateStatus('loading');
    setRateMessage('');
    
    try {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl(`api/reviews/${resolvedParams.id}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          rating: userRating,
          comment: reviewComment
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit review');
      }

      setRateStatus('success');
      setRateMessage('Thank you for your review!');
      toast.success('Review submitted successfully!');
      setShowRateModal(false);
      setUserRating(0);
      setReviewComment('');
      
      // Refresh reviews and recipe data to get updated counts
      await Promise.all([fetchReviews(), fetchRecipeData()]);
    } catch (err: unknown) {
      setRateStatus('error');
      setRateMessage(err instanceof Error ? err.message : 'Failed to submit review');
      toast.error('Failed to submit review');
    }
  };

  // Image navigation
  const nextImage = () => {
    if (recipe && recipe.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % recipe.images.length);
    }
  };

  const prevImage = () => {
    if (recipe && recipe.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + recipe.images.length) % recipe.images.length);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <Loader />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {error || 'Recipe not found'}
          </p>
          <Link href="/recipes" className="text-green-600 hover:text-green-700 font-semibold">
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back to Recipes */}
            <Link 
              href="/recipes" 
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg font-semibold">Back to Recipes</span>
            </Link>

            {/* Recipe Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center" style={{ fontFamily: 'Caveat, cursive' }}>
              {recipe.title}
            </h1>

            {/* Favicon */}
            <div className="bg-transparent border border-gray-300 p-2">
              <Heart className="w-5 h-5 text-green-600" fill="currentColor" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Recipe Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg bg-gray-100">
              {(() => {
                const imageUrl = recipe.images && recipe.images.length > 0 
                  ? recipe.images[currentImageIndex] 
                  : recipe.image;
                
                if (!imageUrl || imageError) {
                  // No image available - show message
                  return (
                    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
                      <ImageOff className="w-20 h-20 text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Image Not Available
                      </p>
                      <p className="text-gray-500 text-sm mt-2 text-center px-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        This recipe image could not be loaded
                      </p>
                    </div>
                  );
                }
                
                return (
                  <Image
                    src={imageUrl}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    onError={() => {
                      setImageError(true);
                    }}
                  />
                );
              })()}
              
              {/* Like Button */}
              <button 
                onClick={handleLike}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg z-10"
                title={isLoggedIn ? (isLiked ? 'Remove from favorites' : 'Add to favorites') : 'Login required'}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'text-green-500 fill-current' : 'text-gray-600'}`} />
              </button>
              
              {/* Category Badge */}
              <div className="absolute bottom-4 left-4 z-10">
                <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full capitalize font-outfit">
                  {recipe.category}
                </span>
              </div>
              
              {/* Rate Button */}
              {isLoggedIn && (
                <button
                  onClick={() => setShowRateModal(true)}
                  className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg z-10"
                  title="Rate this recipe"
                >
                  <Star className="w-6 h-6 text-yellow-500" />
                </button>
              )}
            </div>

            {/* Thumbnail Images - Only show if multiple images */}
            {recipe.images && recipe.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {recipe.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'ring-3 ring-green-500 ring-offset-2' 
                        : 'hover:ring-2 hover:ring-green-300 hover:ring-offset-1'
                    }`}
                  >
                    {thumbnailErrors.has(index) ? (
                      <div className="flex items-center justify-center h-full bg-gray-200">
                        <ImageOff className="w-6 h-6 text-gray-400" />
                      </div>
                    ) : (
                      <Image
                        src={image}
                        alt={`${recipe.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={() => {
                          setThumbnailErrors(prev => new Set(prev).add(index));
                        }}
                      />
                    )}
                    {/* Active overlay */}
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-green-500/20" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recipe Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3 font-caveat">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-outfit">
                {recipe.description}
              </p>
            </div>

            {/* Author & Date */}
            <div className="flex items-center gap-4 text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <span>By {recipe.author?.fullName || 'Anonymous'}</span>
              <span>•</span>
              <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.floor(recipe.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {(() => {
                    const reviewCount = recipe.reviews !== undefined ? recipe.reviews : reviews.length;
                    return `${recipe.rating?.toFixed(1) || '0.0'} (${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'})`;
                  })()}
                </span>
              </div>
            </div>

            {/* Recipe Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Total Time</p>
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>{recipe.time}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Serves</p>
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>{recipe.serves}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <ChefHat className={`w-6 h-6 mx-auto mb-2 ${
                  recipe.difficulty === 'easy' ? 'text-green-500' :
                  recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                }`} />
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Difficulty</p>
                <p className={`font-semibold capitalize ${
                  recipe.difficulty === 'easy' ? 'text-green-500' :
                  recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                }`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {recipe.difficulty}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="w-6 h-6 bg-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Cal</span>
                </div>
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Calories</p>
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {recipe.nutrition?.calories || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Ingredients */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Ingredients
            </h3>
            <ul className="space-y-3">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {ingredient}
                  </span>
                </li>
              )) || (
                <li className="text-gray-500 italic">No ingredients listed</li>
              )}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Instructions
            </h3>
            <ol className="space-y-4">
              {recipe.instructions?.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 pt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {instruction}
                  </p>
                </li>
              )) || (
                <li className="text-gray-500 italic">No instructions provided</li>
              )}
            </ol>
          </div>
        </div>

        {/* Nutritional Information */}
        {recipe.nutrition && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Nutrition Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recipe.nutrition.calories && (
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">{recipe.nutrition.calories}</p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Calories</p>
                </div>
              )}
              {recipe.nutrition.protein && (
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">{recipe.nutrition.protein}</p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Protein</p>
                </div>
              )}
              {recipe.nutrition.carbs && (
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">{recipe.nutrition.carbs}</p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Carbs</p>
                </div>
              )}
              {recipe.nutrition.fat && (
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">{recipe.nutrition.fat}</p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Fat</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 font-caveat">
            Reviews & Ratings
          </h3>
          
          {/* Add Review Button */}
          {isLoggedIn ? (
            <button
              onClick={() => setShowRateModal(true)}
              className="mb-6 bg-green-600 hover:bg-green-700 text-white py-2 px-6 font-semibold transition-colors"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Write a Review
            </button>
          ) : (
            <p className="mb-6 text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold">
                Login
              </Link> to write a review
            </p>
          )}

          {/* Reviews List */}
          {reviewsLoading ? (
            <div className="text-center py-6 text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Loading reviews...
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="border-l-4 border-green-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {review.user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span className="font-semibold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {review.user?.fullName || 'Anonymous User'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {review.comment}
                  </p>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <p className="mb-2">No reviews yet.</p>
              <p className="text-sm">Be the first to share your thoughts about this recipe!</p>
            </div>
          )}
        </div>

        {/* Similar Recipes */}
        {similarRecipes.length > 0 && (
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center font-caveat">
              Similar Recipes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarRecipes.map((similar) => (
                <Link key={similar._id} href={`/recipes/${similar._id}`}>
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      {(() => {
                        const imageUrl = similar.images && similar.images.length > 0 
                          ? similar.images[0] 
                          : similar.image;
                        
                        if (!imageUrl) {
                          return (
                            <div className="flex flex-col items-center justify-center h-full bg-gray-100">
                              <ImageOff className="w-12 h-12 text-gray-400 mb-2" />
                              <p className="text-gray-500 text-xs text-center px-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                Image unavailable
                              </p>
                            </div>
                          );
                        }
                        
                        return (
                          <Image
                            src={imageUrl}
                            alt={similar.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent && !parent.querySelector('.similar-error')) {
                                const errorDiv = document.createElement('div');
                                errorDiv.className = 'similar-error absolute inset-0 bg-gray-100 flex flex-col items-center justify-center';
                                errorDiv.innerHTML = `
                                  <svg class="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <p class="text-gray-500 text-xs text-center px-2" style="font-family: 'Outfit', sans-serif;">Image unavailable</p>
                                `;
                                parent.appendChild(errorDiv);
                              }
                            }}
                          />
                        );
                      })()}
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-2 font-caveat">
                        {similar.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-green-600 font-semibold text-sm font-outfit">
                            {similar.time}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-gray-600 text-sm font-outfit">
                            {similar.rating?.toFixed(1) || '0.0'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {showRateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center" style={{ fontFamily: 'Caveat, cursive' }}>
              Write a Review
            </h2>
            <form onSubmit={handleRateSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Rating
                </label>
                <div className="flex items-center gap-2 justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <Star className={`w-8 h-8 ${star <= userRating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-200'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Your Review
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-gray-900"
                  rows={4}
                  placeholder="Share your thoughts about this recipe..."
                  maxLength={1000}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {reviewComment.length}/1000 characters
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 font-semibold transition-colors duration-300 flex items-center justify-center"
                  disabled={rateStatus === 'loading' || userRating === 0 || !reviewComment.trim()}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {rateStatus === 'loading' ? (
                    <div className="flex items-center gap-2">
                      <ButtonLoader />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Review'
                  )}
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 font-semibold transition-colors"
                  onClick={() => {
                    setShowRateModal(false);
                    setUserRating(0);
                    setReviewComment('');
                    setRateStatus('idle');
                    setRateMessage('');
                  }}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Cancel
                </button>
              </div>
              
              {rateStatus === 'error' && (
                <div className="text-red-600 text-center font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {rateMessage}
                </div>
              )}
              {rateStatus === 'success' && (
                <div className="text-green-600 text-center font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {rateMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
