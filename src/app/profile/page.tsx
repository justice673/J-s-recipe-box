'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ChefHat, Heart, ArrowLeft, Star, ArrowRight, Plus, Edit, User } from 'lucide-react';
import Pagination from '@/components/Pagination';
import AddRecipeModal from '@/components/AddRecipeModal';
import Loader from '@/components/Loader';
import { toast } from 'sonner';
import { apiUrl } from '@/lib/api';

interface Recipe {
  _id?: string;
  id?: string | number;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  difficulty: string;
  category: string;
  cuisine: string;
  diet: string;
  serves: number;
  calories?: number;
  ingredients: string[];
  instructions: string[];
  rating?: number;
  liked?: boolean;
  publishedDate?: string;
  [key: string]: unknown;
}

interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  joinedDate?: string;
  totalRecipes?: number;
  totalFavorites?: number;
  [key: string]: unknown;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState('favorites');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [publishedRecipes, setPublishedRecipes] = React.useState<Recipe[]>([]);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [editRecipe, setEditRecipe] = React.useState<Recipe | null>(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = React.useState<Recipe[]>([]);
  const [mounted, setMounted] = React.useState(false);
  const recipesPerPage = 6;

  // Ensure component is mounted before accessing localStorage
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    
    const fetchProfileAndRecipes = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Not authenticated.');
        // Fetch user profile
        const userRes = await fetch(apiUrl('api/users/me'), {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!userRes.ok) throw new Error('Failed to fetch user profile');
        const userData = await userRes.json();
        setUser(userData);
        // Fetch published recipes
        const recipesRes = await fetch(apiUrl(`api/recipes/user/${userData._id}`));
        if (!recipesRes.ok) throw new Error('Failed to fetch recipes');
        const recipesData = await recipesRes.json();
        setPublishedRecipes(recipesData);
      } catch (err: unknown) {
        let errorMsg = 'Failed to fetch profile or recipes';
        if (err instanceof Error) errorMsg = err.message;
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndRecipes();
  }, [mounted]);

  React.useEffect(() => {
    if (!mounted) return;
    
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch(apiUrl('api/recipes/popular'), {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const allPopular = await res.json();
        // If backend supports a /api/recipes/favorites or similar, use that instead.
        // For now, filter recipes where user has liked them (assuming backend returns this info)
        const userId = user?._id;
        const liked = allPopular.filter((r: Record<string, unknown>) => Array.isArray(r.likedBy) && userId && r.likedBy.includes(userId));
        setFavoriteRecipes(liked);
      } catch {}
    };
    if (activeTab === 'favorites' && user && mounted) fetchFavorites();
  }, [activeTab, user, mounted]);

  // Get current recipes based on active tab
  const currentRecipes = activeTab === 'favorites' ? favoriteRecipes : publishedRecipes;
  // Calculate pagination
  const totalPages = Math.ceil(currentRecipes.length / recipesPerPage);
  const startIndex = currentPage * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const displayRecipes = currentRecipes.slice(startIndex, endIndex);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(0);
    const tabNames: { [key: string]: string } = {
      'favorites': 'Favorite Recipes',
      'published': 'Published Recipes'
    };
    toast.info(`Switched to ${tabNames[tab]} 📋`);
  };

  const handleAddRecipe = async (recipeData: Recipe) => {
    try {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated.');
      const res = await fetch(apiUrl('api/recipes'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(recipeData)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to add recipe');
      }
      // Refetch published recipes
      const userRes = await fetch(apiUrl('api/users/me'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await userRes.json();
      const recipesRes = await fetch(apiUrl(`api/recipes/user/${userData._id}`));
      const recipesData = await recipesRes.json();
      setPublishedRecipes(recipesData);
      setActiveTab('published');
      setCurrentPage(0);
    } catch (err: unknown) {
      let errorMsg = 'Failed to add recipe';
      if (err instanceof Error) errorMsg = err.message;
      toast.error(errorMsg);
    }
  };

  const handleEditClick = (recipe: Recipe) => {
    setEditRecipe(recipe);
    setShowEditModal(true);
  };

  const handleEditRecipe = async (updatedData: Recipe) => {
    try {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      if (!token || !editRecipe) {
        toast.error('Please log in to edit recipes');
        return;
      }
      const res = await fetch(apiUrl(`api/recipes/${editRecipe._id || editRecipe.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to update recipe');
      }
      toast.success('Recipe updated successfully! ✏️');
      // Refetch recipes
      const userRes = await fetch(apiUrl('api/users/me'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await userRes.json();
      const recipesRes = await fetch(apiUrl(`api/recipes/user/${userData._id}`));
      const recipesData = await recipesRes.json();
      setPublishedRecipes(recipesData);
      setShowEditModal(false);
      setEditRecipe(null);
    } catch (err: unknown) {
      let errorMsg = 'Failed to update recipe';
      if (err instanceof Error) errorMsg = err.message;
      toast.error(errorMsg);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    if (typeof window === 'undefined') return;
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to delete recipes');
        return;
      }
      const res = await fetch(apiUrl(`api/recipes/${recipeId}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to delete recipe');
      }
      toast.success('Recipe deleted successfully! 🗑️');
      // Refetch recipes
      const userRes = await fetch(apiUrl('api/users/me'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await userRes.json();
      const recipesRes = await fetch(apiUrl(`api/recipes/user/${userData._id}`));
      const recipesData = await recipesRes.json();
      setPublishedRecipes(recipesData);
    } catch (err: unknown) {
      let errorMsg = 'Failed to delete recipe';
      if (err instanceof Error) errorMsg = err.message;
      toast.error(errorMsg);
    }
  };

  const userInitials = user ? (user.fullName?.split(' ').map((n: string) => n[0]).join('').toUpperCase()) : '';

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <Loader />;
  }

  if (loading) return <Loader />;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!user) return <div className="p-8 text-center">No user data.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back to Home */}
            <Link 
              href="/" 
              className="flex items-center gap-1 sm:gap-2 text-green-600 hover:text-green-700 transition-colors font-caveat"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-lg font-semibold hidden xs:inline">Back to Home</span>
              <span className="text-sm font-semibold xs:hidden">Back</span>
            </Link>

            {/* Page Title */}
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center font-caveat">
              My Profile
            </h1>

            {/* Add Recipe Button */}
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold transition-colors flex items-center gap-1 sm:gap-2 font-caveat"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Add Recipe</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold font-caveat">
                {userInitials}
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-caveat">
                {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 font-outfit">
                {user.email}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 font-outfit">
                Member since <span className="text-green-600">{user.joinedDate || 'Recently'}</span>
              </p>
              
              {/* Stats */}
              <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8">
                <div className="text-center">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 font-caveat">
                    {publishedRecipes.length || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 font-outfit">
                    Published Recipes
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 font-caveat">
                    {favoriteRecipes.length || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 font-outfit">
                    Favorite Recipes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => handleTabChange('favorites')}
                className={`py-3 sm:py-4 px-3 sm:px-6 border-b-2 font-semibold text-xs sm:text-sm transition-colors flex-1 font-caveat ${
                  activeTab === 'favorites'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Favorite Recipes ({favoriteRecipes.length || 0})</span>
                  <span className="xs:hidden">Favorites ({favoriteRecipes.length || 0})</span>
                </div>
              </button>
              <button
                onClick={() => handleTabChange('published')}
                className={`py-3 sm:py-4 px-3 sm:px-6 border-b-2 font-semibold text-xs sm:text-sm transition-colors flex-1 font-caveat ${
                  activeTab === 'published'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <ChefHat className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">My Recipes ({publishedRecipes.length || 0})</span>
                  <span className="xs:hidden">Published ({publishedRecipes.length || 0})</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          
          {/* Results Header */}
          <div className="mb-4 sm:mb-6">
            <p className="text-gray-600 text-sm sm:text-base md:text-lg font-outfit">
              {currentRecipes.length} {activeTab === 'favorites' ? 'favorite' : 'published'} recipe{currentRecipes.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Empty State */}
          {currentRecipes.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-4">
                {activeTab === 'favorites' ? (
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
                ) : (
                  <ChefHat className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-600 mb-2 font-caveat">
                {activeTab === 'favorites' ? 'No Favorites Yet' : 'No Recipes Published'}
              </h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base px-4 font-outfit">
                {activeTab === 'favorites'
                  ? 'Start exploring recipes and add them to your favorites!'
                  : 'Share your culinary creations with the community!'
                }
              </p>
              <Link
                href={activeTab === 'favorites' ? '/recipes' : '#'}
                onClick={activeTab === 'published' ? () => setShowAddModal(true) : undefined}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base font-semibold transition-colors font-caveat"
              >
                {activeTab === 'favorites' ? 'Browse Recipes' : 'Add Your First Recipe'}
              </Link>
            </div>
          ) : (
            <>
              {/* Recipes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                {displayRecipes.map((recipe, index) => (
                  <div key={recipe.id || recipe._id} className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3}
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                      {activeTab === 'published' && (
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                            onClick={() => handleEditClick(recipe as Recipe)}
                            title="Edit Recipe"
                          >
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                            onClick={() => handleDeleteRecipe((recipe._id || recipe.id)?.toString() || '')}
                            title="Delete Recipe"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-600">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full capitalize font-outfit">
                          {recipe.cuisine}
                        </span>
                        {recipe.diet !== 'none' && (
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full capitalize font-outfit">
                            {recipe.diet}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-5 lg:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 line-clamp-2 font-caveat">
                        {recipe.title}
                      </h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-sm line-clamp-2 font-outfit">
                        {recipe.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-green-600 mr-1" />
                            <span className="text-green-600 font-semibold text-sm font-outfit">
                              {recipe.prepTime || (recipe as any).time || 0} min
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 text-sm font-outfit">
                              {recipe.calories || 0} cal
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <ChefHat className={`w-4 h-4 mr-1 ${
                            recipe.difficulty === 'easy' ? 'text-green-500' :
                            recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                          }`} />
                          <span className={`text-sm font-semibold capitalize font-outfit ${
                            recipe.difficulty === 'easy' ? 'text-green-500' :
                            recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {recipe.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${star <= Math.floor(Number(recipe.rating ?? 0)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="ml-1 text-xs sm:text-sm text-gray-600 font-outfit">
                            ({(recipe.rating ?? 0).toFixed(1)})
                          </span>
                        </div>
                        <Link
                          href={`/recipes/${String(recipe.id ?? recipe._id ?? '')}`}
                          className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1 font-caveat"
                        >
                          <span className="hidden sm:inline">View Recipe</span>
                          <span className="sm:hidden">View</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                onPageChange={handlePageChange} 
              />
            </>
          )}
        </div>
      </div>

      {/* Add Recipe Modal */}
      <AddRecipeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddRecipe}
      />

      {/* Edit Recipe Modal */}
      {showEditModal && (
        <AddRecipeModal
          isOpen={showEditModal}
          onClose={() => { setShowEditModal(false); setEditRecipe(null); }}
          onSubmit={handleEditRecipe}
          initialData={editRecipe || undefined}
        />
      )}
    </div>
  );
}
