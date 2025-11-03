'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight, ImageOff } from 'lucide-react';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  averageRating: number;
  category: string;
  difficulty: string;
  serves: number;
  likes: number;
}

export default function PopularRecipes() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [imageErrors, setImageErrors] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${base}/api/recipes?limit=6&sort=likes`);
        if (res.ok) {
          const data = await res.json();
          // Handle different response formats
          let recipesArray: Recipe[] = [];
          if (Array.isArray(data)) {
            recipesArray = data;
          } else if (data && Array.isArray(data.recipes)) {
            recipesArray = data.recipes;
          } else if (data && Array.isArray(data.data)) {
            recipesArray = data.data;
          } else {
            console.warn('Unexpected response format:', data);
            recipesArray = [];
          }
          setRecipes(recipesArray.slice(0, 6)); // Take first 6 recipes
        }
      } catch (error) {
        console.error('Failed to fetch popular recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularRecipes();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>Loading popular recipes...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
            Popular Recipes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Discover the most loved recipes from our community of food enthusiasts
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                {!recipe.image || imageErrors.has(recipe._id) ? (
                  <div className="flex flex-col items-center justify-center h-full bg-gray-100">
                    <ImageOff className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm text-center px-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Image unavailable
                    </p>
                  </div>
                ) : (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    onError={() => {
                      setImageErrors(prev => new Set(prev).add(recipe._id));
                    }}
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  {recipe.title}
                </h3>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {recipe.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {recipe.prepTime} min
                    </span>
                  </div>
                  <Link
                    href={`/recipes/${recipe._id}`}
                    className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
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

        {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/recipes">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ fontFamily: 'Caveat, cursive' }}>
                View All Recipes
              </button>
            </Link>
          </div>
      </div>
    </section>
  );
}
