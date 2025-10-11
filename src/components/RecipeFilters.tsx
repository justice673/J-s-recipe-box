import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface RecipeFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  clearFilters: () => void;
  // New advanced filter props
  ingredientFilter: string;
  setIngredientFilter: (ingredient: string) => void;
  selectedCuisine: string;
  setSelectedCuisine: (cuisine: string) => void;
  selectedDiet: string;
  setSelectedDiet: (diet: string) => void;
  calorieRange: string;
  setCalorieRange: (calorie: string) => void;
}

export default function RecipeFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedTime,
  setSelectedTime,
  showFilters,
  setShowFilters,
  clearFilters,
  // New advanced filter props
  ingredientFilter,
  setIngredientFilter,
  selectedCuisine,
  setSelectedCuisine,
  selectedDiet,
  setSelectedDiet,
  calorieRange,
  setCalorieRange
}: RecipeFiltersProps) {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'snack', label: 'Snacks' },
    { value: 'beverage', label: 'Beverages' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const timeRanges = [
    { value: 'all', label: 'Any Time' },
    { value: '0-15', label: 'Under 15 min' },
    { value: '15-30', label: '15-30 min' },
    { value: '30-60', label: '30-60 min' },
    { value: '60+', label: 'Over 60 min' }
  ];

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

  const calorieRanges = [
    { value: 'all', label: 'Any Calories' },
    { value: '0-200', label: 'Under 200 cal' },
    { value: '200-400', label: '200-400 cal' },
    { value: '400-600', label: '400-600 cal' },
    { value: '600+', label: 'Over 600 cal' }
  ];

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors mb-6"
        style={{ fontFamily: 'Caveat, cursive' }}
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span className="font-semibold">Filters</span>
      </button>

      {/* Filters Sidebar */}
      <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
              Filters
            </h3>
            <button
              onClick={clearFilters}
              className="text-sm text-green-600 hover:text-green-700 font-semibold"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Clear All
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Search Recipes
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Cooking Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {timeRanges.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ingredient Search */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Search by Ingredients
            </label>
            <input
              type="text"
              value={ingredientFilter}
              onChange={(e) => setIngredientFilter(e.target.value)}
              placeholder="e.g., chicken, tomato..."
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            />
          </div>

          {/* Cuisine Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Cuisine
            </label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
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
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Diet
            </label>
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {diets.map((diet) => (
                <option key={diet.value} value={diet.value}>
                  {diet.label}
                </option>
              ))}
            </select>
          </div>

          {/* Calorie Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Calories
            </label>
            <select
              value={calorieRange}
              onChange={(e) => setCalorieRange(e.target.value)}
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
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
      </div>
    </>
  );
}
