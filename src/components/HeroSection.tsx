'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Plus } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();

  const handleExploreRecipes = () => {
    router.push('/recipes');
  };

  const handleShareRecipe = () => {
    router.push('/profile');
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/j's recipe box .jpg"
          alt="J's Recipe Box - Delicious food background"
          fill
          className="object-cover object-center"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=1920&h=1080&fit=crop';
          }}
        />
      </div>

      {/* Glass Overlay for better text readability */}
      <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[0.5px]"></div>

      {/* Content */}
      <div className="relative z-30 w-full px-8 flex items-center min-h-screen pt-24 md:pt-16 lg:pt-0">
        <div className="max-w-2xl ml-0">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-none tracking-tight">
            <span className="drop-shadow-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Welcome to</span>
            <br />
            <div className="flex items-center gap-4 mt-2">
              <img 
                src="/logo.png" 
                alt="J's Recipe Box Logo" 
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 drop-shadow-lg"
              />
              <span className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent drop-shadow-none" style={{ fontFamily: 'Caveat, cursive' }}>
                J&apos;s Recipe Box
              </span>
            </div>
          </h1>
          
          <p className="text-2xl md:text-3xl lg:text-4xl mb-4 text-white/95 font-medium leading-tight" style={{ fontFamily: 'Caveat, cursive' }}>
            <span className="drop-shadow-lg">Where Every Recipe Tells a Story</span>
          </p>

          <p className="text-lg md:text-xl mb-12 text-white/85 leading-relaxed max-w-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="drop-shadow-md">
              Discover incredible recipes, share your culinary creations, and connect with food lovers from around the world. 
              From grandmother&apos;s secret recipes to modern culinary innovations.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={handleExploreRecipes}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base font-semibold shadow-2xl shadow-green-500/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/40 border-0 flex items-center gap-2 justify-center" 
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              <Search className="w-5 h-5" />
              Explore Recipes
            </button>
            
            <button 
              onClick={handleShareRecipe}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-base font-semibold border border-white/50 hover:border-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 justify-center" 
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              <Plus className="w-5 h-5" />
              Share Your Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
