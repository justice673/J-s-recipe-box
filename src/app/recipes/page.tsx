'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ChefHat, Heart, ArrowLeft, Star, ArrowRight } from 'lucide-react';
import RecipeFilters from '@/components/RecipeFilters';
import Pagination from '@/components/Pagination';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/Loader';
import ButtonLoader from '@/components/ButtonLoader';
import { toast } from 'sonner';
import { apiUrl } from '@/lib/api';

interface Recipe {
  _id?: string;
  id?: string | number;
  title: string;
  description: string;
  image: string;
  images?: string[]; // Array of all images
  prepTime: number; // minutes
  difficulty: string;
  category: string;
  cuisine: string;
  diet: string;
  serves: number;
  rating: number;
  calories: number;
  liked?: boolean;
  ingredients: string[];
  [key: string]: any;
}

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('all');
  const [selectedTime, setSelectedTime] = React.useState('all');
  const [showFilters, setShowFilters] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [ingredientFilter, setIngredientFilter] = React.useState('');
  const [selectedCuisine, setSelectedCuisine] = React.useState('all');
  const [selectedDiet, setSelectedDiet] = React.useState('all');
  const [calorieRange, setCalorieRange] = React.useState('all');
  const [userLikes, setUserLikes] = React.useState<{ [key: string]: boolean }>({});
  const { user, login } = useAuth();
  const [favoriteCount, setFavoriteCount] = React.useState(user?.totalFavorites || 0);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState('');
  const [likingRecipes, setLikingRecipes] = React.useState<{ [key: string]: boolean }>({});
  const recipesPerPage = 6;

  React.useEffect(() => { setFavoriteCount(user?.totalFavorites || 0); }, [user]);

  const normalizeRecipe = (r: any): Recipe => ({
    _id: r._id,
    id: r._id || r.id,
    title: r.title || 'Untitled',
    description: r.description || 'No description provided.',
    image: typeof r.image === 'string' && r.image.startsWith('http') ? r.image : (r.image?.url || ''),
    prepTime: Number(r.prepTime || r.time || 0),
    difficulty: r.difficulty || 'easy',
    category: r.category || 'other',
    cuisine: r.cuisine || 'modern',
    diet: r.diet || 'none',
    serves: Number(r.serves || r.yield || 1),
    rating: r.averageRating || (typeof r.rating === 'number' ? r.rating : (Array.isArray(r.ratings) && r.ratings.length ? r.ratings.reduce((a:number,b:any)=>a+(b.rating||b),0)/r.ratings.length : 0)),
    calories: Number(r.calories || 0),
    liked: !!r.liked,
    ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
  });

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true); setLoadError('');
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${base}/api/recipes`);
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        if (!cancelled) {
          // Handle different response formats
          let recipesArray: any[] = [];
          if (Array.isArray(data)) {
            recipesArray = data;
          } else if (data && Array.isArray(data.recipes)) {
            recipesArray = data.recipes;
          } else if (data && Array.isArray(data.data)) {
            recipesArray = data.data;
          }
          setRecipes(recipesArray.map(normalizeRecipe));
        }
      } catch (e:any) {
        if (!cancelled) setLoadError(e.message || 'Failed to load recipes');
      } finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  // Build likes map when recipes change
  React.useEffect(() => {
    const likes: { [key: string]: boolean } = {};
    recipes.forEach(r => { const rid = r._id || r.id; if (rid) likes[String(rid)] = !!r.liked; });
    setUserLikes(likes);
  }, [recipes]);

  const clearFilters = () => { 
    setSelectedCategory('all'); 
    setSelectedDifficulty('all'); 
    setSelectedTime('all'); 
    setSearchQuery(''); 
    setIngredientFilter(''); 
    setSelectedCuisine('all'); 
    setSelectedDiet('all'); 
    setCalorieRange('all'); 
    setCurrentPage(0); 
    toast.success('All filters cleared! 🔄');
  };

  const handleLike = async (recipeId: string | number) => {
    const recipeIdString = String(recipeId);
    setLikingRecipes(prev => ({ ...prev, [recipeIdString]: true }));
    
    try {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to add recipes to favorites');
        return;
      }
      
      const wasLiked = userLikes[recipeIdString];
      const res = await fetch(apiUrl(`api/recipes/${recipeId}/like`), {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to update favorites');
      }
      
      setUserLikes(prev => {
        const updated = { ...prev, [recipeId]: !prev[recipeId] };
        return updated;
      });
      
      // Show success message
      toast.success(wasLiked ? 'Removed from favorites ❤️' : 'Added to favorites 💚');
      
      // Fetch updated user profile for accurate favorite count
      const userRes = await fetch(apiUrl('api/users/me'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        login({
          fullName: userData.fullName || (userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : ''),
          email: userData.email,
          totalFavorites: userData.totalFavorites || 0
        }, token);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update favorites';
      toast.error(errorMsg);
    } finally {
      setLikingRecipes(prev => ({ ...prev, [recipeIdString]: false }));
    }
  };

  // Filter recipes based on selected filters
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIngredients = ingredientFilter === '' || 
                              recipe.ingredients.some(ingredient => 
                                ingredient.toLowerCase().includes(ingredientFilter.toLowerCase())
                              );
    
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    const matchesCuisine = selectedCuisine === 'all' || recipe.cuisine === selectedCuisine;
    const matchesDiet = selectedDiet === 'all' || recipe.diet === selectedDiet;
    
    let matchesTime = true;
    if (selectedTime !== 'all') {
      const prepTime = recipe.prepTime;
      switch (selectedTime) {
        case '0-15':
          matchesTime = prepTime <= 15;
          break;
        case '15-30':
          matchesTime = prepTime > 15 && prepTime <= 30;
          break;
        case '30-60':
          matchesTime = prepTime > 30 && prepTime <= 60;
          break;
        case '60+':
          matchesTime = prepTime > 60;
          break;
      }
    }
    
    let matchesCalories = true;
    if (calorieRange !== 'all') {
      const calories = recipe.calories;
      switch (calorieRange) {
        case '0-200':
          matchesCalories = calories <= 200;
          break;
        case '200-400':
          matchesCalories = calories > 200 && calories <= 400;
          break;
        case '400-600':
          matchesCalories = calories > 400 && calories <= 600;
          break;
        case '600+':
          matchesCalories = calories > 600;
          break;
      }
    }
    
    return matchesSearch && matchesIngredients && matchesCategory && matchesDifficulty && 
           matchesCuisine && matchesDiet && matchesTime && matchesCalories;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = currentPage * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    // Scroll to top of recipes section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back to Home */}
            <Link 
              href="/" 
              className="flex items-center gap-1 sm:gap-2 text-green-600 hover:text-green-700 transition-colors"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-lg font-semibold hidden xs:inline">Back to Home</span>
              <span className="text-sm font-semibold xs:hidden">Back</span>
            </Link>

            {/* Page Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center" style={{ fontFamily: 'Caveat, cursive' }}>
              All Recipes
            </h1>

            {/* Favorite Icon with Count */}
            <div className="relative">
              <div className="bg-transparent border border-gray-300 p-1.5 sm:p-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" />
              </div>
              {user && favoriteCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {favoriteCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          
          <RecipeFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            clearFilters={clearFilters}
            ingredientFilter={ingredientFilter}
            setIngredientFilter={setIngredientFilter}
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={setSelectedCuisine}
            selectedDiet={selectedDiet}
            setSelectedDiet={setSelectedDiet}
            calorieRange={calorieRange}
            setCalorieRange={setCalorieRange}
          />

          {/* Recipes Grid */}
          <div className="lg:col-span-4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <p className="text-gray-600 text-sm sm:text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredRecipes.length)} of {filteredRecipes.length} recipes
                </p>
                <Link
                  href="/search"
                  className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors self-start"
                  style={{ fontFamily: 'Caveat, cursive' }}
                >
                  Advanced Search →
                </Link>
              </div>
              <select className="px-3 py-2 sm:px-4 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 text-sm sm:text-base w-full sm:w-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <option>Sort by: Most Popular</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Cooking Time</option>
              </select>
            </div>

            {/* Recipes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {currentRecipes.map((recipe) => {
                const rid = (recipe._id || recipe.id)!; // guaranteed by normalization
                return (
                  <div key={rid} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                      <Image
                        src={recipe.image || 'https://via.placeholder.com/500x300/e5e7eb/6b7280?text=Recipe+Image'}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/500x300/e5e7eb/6b7280?text=Recipe+Image';
                        }}
                      />
                      <button
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors flex items-center justify-center"
                        onClick={() => handleLike(rid)}
                        title={userLikes[rid] ? 'Unlike' : 'Like'}
                        disabled={likingRecipes[String(rid)]}
                      >
                        {likingRecipes[String(rid)] ? (
                          <ButtonLoader />
                        ) : (
                          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${userLikes[rid] ? 'text-green-500 fill-current' : 'text-gray-600'}`} />
                        )}
                      </button>
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                        <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full capitalize" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {recipe.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 lg:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 line-clamp-2" style={{ fontFamily: 'Caveat, cursive' }}>
                        {recipe.title}
                      </h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-sm line-clamp-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {recipe.description}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-green-600 mr-1" />
                            <span className="text-green-600 font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {recipe.prepTime} min
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-500 mr-1" />
                            <span className="text-gray-500 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {recipe.serves}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <ChefHat className={`w-4 h-4 mr-1 ${
                            recipe.difficulty === 'easy' ? 'text-green-500' :
                            recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                          }`} />
                          <span className={`text-sm font-semibold capitalize ${
                            recipe.difficulty === 'easy' ? 'text-green-500' :
                            recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                          }`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {recipe.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${star <= Math.floor(recipe.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                          <span className="ml-1 text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            ({recipe.rating.toFixed(1)})
                          </span>
                        </div>
                        <Link
                          href={`/recipes/${rid}`}
                          className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
                          style={{ fontFamily: 'Caveat, cursive' }}
                        >
                          <span className="hidden sm:inline">View Recipe</span>
                          <span className="sm:hidden">View</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {loading && (
              <div className="text-center py-6 sm:py-8 text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Loading recipes...
              </div>
            )}
            {loadError && !loading && (
              <div className="text-center py-4 text-red-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {loadError}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-6 sm:mt-8">
              <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                onPageChange={handlePageChange} 
              />
            </div>

            {/* No Results Message */}
            {filteredRecipes.length === 0 && !loading && (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 mb-4">
                  <ChefHat className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-600 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                  No Recipes Found
                </h3>
                <p className="text-gray-500 text-sm sm:text-base px-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Try adjusting your filters or search terms to find more recipes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
