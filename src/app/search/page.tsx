'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Clock, ChefHat, Heart, ArrowLeft, Star, ArrowRight, Filter } from 'lucide-react';
import Pagination from '@/components/Pagination';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [ingredientFilter, setIngredientFilter] = React.useState('');
  const [selectedCuisine, setSelectedCuisine] = React.useState('all');
  const [selectedDiet, setSelectedDiet] = React.useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('all');
  const [prepTimeRange, setPrepTimeRange] = React.useState('all');
  const [calorieRange, setCalorieRange] = React.useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  
  const recipesPerPage = 9;

  // Initialize search query from URL parameter
  React.useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
    }
  }, [searchParams]);

  // Expanded recipe data with new filtering properties
  const recipes = [
    {
      id: 1,
      title: 'Delicious Homemade Burger',
      description: 'A juicy, flavorful burger made with fresh ingredients and secret seasonings.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r1.jpg',
      time: '25 min',
      prepTime: 15,
      difficulty: 'easy',
      category: 'lunch',
      cuisine: 'american',
      diet: 'none',
      serves: 4,
      rating: 4.8,
      calories: 650,
      liked: false,
      ingredients: ['ground beef', 'burger buns', 'cheese', 'lettuce', 'tomato', 'onion']
    },
    {
      id: 2,
      title: 'Fresh Garden Salad',
      description: 'A refreshing mix of seasonal vegetables with homemade vinaigrette.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r2.jpg',
      time: '10 min',
      prepTime: 10,
      difficulty: 'easy',
      category: 'lunch',
      cuisine: 'mediterranean',
      diet: 'vegetarian',
      serves: 2,
      rating: 4.6,
      calories: 180,
      liked: true,
      ingredients: ['lettuce', 'tomato', 'cucumber', 'olive oil', 'vinegar', 'herbs']
    },
    {
      id: 3,
      title: 'Chocolate Cake Delight',
      description: 'Rich, moist chocolate cake that melts in your mouth with every bite.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r3.jpg',
      time: '90 min',
      prepTime: 75,
      difficulty: 'hard',
      category: 'dessert',
      cuisine: 'french',
      diet: 'vegetarian',
      serves: 8,
      rating: 4.9,
      calories: 450,
      liked: false,
      ingredients: ['chocolate', 'flour', 'eggs', 'butter', 'sugar', 'vanilla']
    },
    {
      id: 4,
      title: 'Creamy Pasta Primavera',
      description: 'Perfectly cooked pasta with fresh vegetables in a creamy sauce.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r4.jpg',
      time: '30 min',
      prepTime: 20,
      difficulty: 'medium',
      category: 'dinner',
      cuisine: 'italian',
      diet: 'vegetarian',
      serves: 4,
      rating: 4.7,
      calories: 520,
      liked: true,
      ingredients: ['pasta', 'cream', 'vegetables', 'parmesan', 'herbs', 'garlic']
    },
    {
      id: 5,
      title: 'Grilled Salmon',
      description: 'Perfectly seasoned salmon grilled to perfection with lemon herbs.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r5.jpg',
      time: '20 min',
      prepTime: 15,
      difficulty: 'medium',
      category: 'dinner',
      cuisine: 'nordic',
      diet: 'keto',
      serves: 2,
      rating: 4.8,
      calories: 380,
      liked: false,
      ingredients: ['salmon', 'lemon', 'herbs', 'olive oil', 'garlic', 'pepper']
    },
    {
      id: 6,
      title: 'Fresh Berry Smoothie',
      description: 'A healthy blend of fresh berries, yogurt, and natural sweeteners.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r6.jpg',
      time: '5 min',
      prepTime: 5,
      difficulty: 'easy',
      category: 'beverage',
      cuisine: 'american',
      diet: 'vegetarian',
      serves: 1,
      rating: 4.5,
      calories: 220,
      liked: true,
      ingredients: ['berries', 'yogurt', 'honey', 'milk', 'ice']
    },
    {
      id: 7,
      title: 'Pancakes with Syrup',
      description: 'Fluffy pancakes served with maple syrup and fresh berries.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/bg1.jpg',
      time: '25 min',
      prepTime: 20,
      difficulty: 'easy',
      category: 'breakfast',
      cuisine: 'american',
      diet: 'vegetarian',
      serves: 3,
      rating: 4.7,
      calories: 380,
      liked: false,
      ingredients: ['flour', 'eggs', 'milk', 'maple syrup', 'berries', 'butter']
    },
    {
      id: 8,
      title: 'Avocado Toast',
      description: 'Crispy toast topped with fresh avocado, herbs, and a drizzle of olive oil.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/insta5.jpg',
      time: '8 min',
      prepTime: 8,
      difficulty: 'easy',
      category: 'breakfast',
      cuisine: 'modern',
      diet: 'vegan',
      serves: 2,
      rating: 4.4,
      calories: 280,
      liked: true,
      ingredients: ['avocado', 'bread', 'olive oil', 'lemon', 'herbs', 'salt']
    },
    {
      id: 9,
      title: 'Thai Green Curry',
      description: 'Aromatic Thai curry with coconut milk and fresh vegetables.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r1.jpg',
      time: '35 min',
      prepTime: 25,
      difficulty: 'medium',
      category: 'dinner',
      cuisine: 'thai',
      diet: 'vegan',
      serves: 4,
      rating: 4.6,
      calories: 320,
      liked: false,
      ingredients: ['curry paste', 'coconut milk', 'vegetables', 'rice', 'herbs', 'chili']
    },
    {
      id: 10,
      title: 'Greek Yogurt Parfait',
      description: 'Layered yogurt with granola, honey, and fresh fruits.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r2.jpg',
      time: '5 min',
      prepTime: 5,
      difficulty: 'easy',
      category: 'breakfast',
      cuisine: 'greek',
      diet: 'vegetarian',
      serves: 1,
      rating: 4.3,
      calories: 250,
      liked: true,
      ingredients: ['greek yogurt', 'granola', 'honey', 'berries', 'nuts']
    }
  ];

  // Filter options
  const cuisines = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'american', label: 'American' },
    { value: 'italian', label: 'Italian' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'french', label: 'French' },
    { value: 'thai', label: 'Thai' },
    { value: 'greek', label: 'Greek' },
    { value: 'nordic', label: 'Nordic' },
    { value: 'modern', label: 'Modern' }
  ];

  const diets = [
    { value: 'all', label: 'All Diets' },
    { value: 'none', label: 'No Restrictions' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'gluten-free', label: 'Gluten Free' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const prepTimeRanges = [
    { value: 'all', label: 'Any Time' },
    { value: '0-10', label: 'Under 10 min' },
    { value: '10-20', label: '10-20 min' },
    { value: '20-30', label: '20-30 min' },
    { value: '30-60', label: '30-60 min' },
    { value: '60+', label: 'Over 60 min' }
  ];

  const calorieRanges = [
    { value: 'all', label: 'Any Calories' },
    { value: '0-200', label: 'Under 200 cal' },
    { value: '200-400', label: '200-400 cal' },
    { value: '400-600', label: '400-600 cal' },
    { value: '600+', label: 'Over 600 cal' }
  ];

  const clearAllFilters = () => {
    setSearchQuery('');
    setIngredientFilter('');
    setSelectedCuisine('all');
    setSelectedDiet('all');
    setSelectedDifficulty('all');
    setPrepTimeRange('all');
    setCalorieRange('all');
    setCurrentPage(0);
  };

  // Advanced filtering logic
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIngredients = ingredientFilter === '' || 
                              recipe.ingredients.some(ingredient => 
                                ingredient.toLowerCase().includes(ingredientFilter.toLowerCase())
                              );
    
    const matchesCuisine = selectedCuisine === 'all' || recipe.cuisine === selectedCuisine;
    const matchesDiet = selectedDiet === 'all' || recipe.diet === selectedDiet;
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    
    let matchesPrepTime = true;
    if (prepTimeRange !== 'all') {
      const prepTime = recipe.prepTime;
      switch (prepTimeRange) {
        case '0-10':
          matchesPrepTime = prepTime <= 10;
          break;
        case '10-20':
          matchesPrepTime = prepTime > 10 && prepTime <= 20;
          break;
        case '20-30':
          matchesPrepTime = prepTime > 20 && prepTime <= 30;
          break;
        case '30-60':
          matchesPrepTime = prepTime > 30 && prepTime <= 60;
          break;
        case '60+':
          matchesPrepTime = prepTime > 60;
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
    
    return matchesSearch && matchesIngredients && matchesCuisine && matchesDiet && 
           matchesDifficulty && matchesPrepTime && matchesCalories;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = currentPage * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFiltersCount = [
    searchQuery,
    ingredientFilter,
    selectedCuisine !== 'all' ? selectedCuisine : '',
    selectedDiet !== 'all' ? selectedDiet : '',
    selectedDifficulty !== 'all' ? selectedDifficulty : '',
    prepTimeRange !== 'all' ? prepTimeRange : '',
    calorieRange !== 'all' ? calorieRange : ''
  ].filter(filter => filter !== '').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back to Home */}
            <Link 
              href="/" 
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg font-semibold">Back to Home</span>
            </Link>

            {/* Page Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
              Search Recipes
            </h1>

            {/* Favicon */}
            <div className="bg-transparent border border-gray-300 p-2">
              <Heart className="w-5 h-5 text-green-600" fill="currentColor" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes by name or description..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            />
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Advanced Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-green-600 hover:text-green-700 font-semibold"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                  style={{ fontFamily: 'Caveat, cursive' }}
                >
                  <Filter className="w-5 h-5" />
                  <span className="font-semibold">{showAdvancedFilters ? 'Hide' : 'Show'} Filters</span>
                </button>
              </div>
            </div>

            {showAdvancedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Ingredient Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Search by Ingredients
                  </label>
                  <input
                    type="text"
                    value={ingredientFilter}
                    onChange={(e) => setIngredientFilter(e.target.value)}
                    placeholder="e.g., chicken, tomato..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  />
                </div>

                {/* Cuisine Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Cuisine
                  </label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {cuisines.map((cuisine) => (
                      <option key={cuisine.value} value={cuisine.value}>
                        {cuisine.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Diet Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Diet
                  </label>
                  <select
                    value={selectedDiet}
                    onChange={(e) => setSelectedDiet(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {diets.map((diet) => (
                      <option key={diet.value} value={diet.value}>
                        {diet.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty.value} value={difficulty.value}>
                        {difficulty.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prep Time Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Preparation Time
                  </label>
                  <select
                    value={prepTimeRange}
                    onChange={(e) => setPrepTimeRange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {prepTimeRanges.map((time) => (
                      <option key={time.value} value={time.value}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Calorie Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Calories
                  </label>
                  <select
                    value={calorieRange}
                    onChange={(e) => setCalorieRange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {calorieRanges.map((calorie) => (
                      <option key={calorie.value} value={calorie.value}>
                        {calorie.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <p className="text-gray-600 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Found {filteredRecipes.length} recipes
            {activeFiltersCount > 0 && (
              <span className="text-green-600"> with {activeFiltersCount} active filters</span>
            )}
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart className={`w-5 h-5 ${recipe.liked ? 'text-green-500 fill-current' : 'text-gray-600'}`} />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full capitalize" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {recipe.cuisine}
                  </span>
                  {recipe.diet !== 'none' && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full capitalize" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {recipe.diet}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  {recipe.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {recipe.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-600 font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {recipe.time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {recipe.calories} cal
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
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= Math.floor(recipe.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      ({recipe.rating})
                    </span>
                  </div>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
                    style={{ fontFamily: 'Caveat, cursive' }}
                  >
                    View Recipe
                    <ArrowRight className="w-4 h-4" />
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

        {/* No Results Message */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
              No Recipes Found
            </h3>
            <p className="text-gray-500 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Try adjusting your search terms or filters to find more recipes.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div>Loading search...</div></div>}>
      <SearchPageContent />
    </Suspense>
  );
}
