'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddRecipeModal, { Recipe } from '@/components/AddRecipeModal';
import { ChefHat, Users, Clock, Award } from 'lucide-react';
import { toast } from 'sonner';
import { apiUrl } from '@/lib/api';

export default function SubmitRecipePage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to ensure auth state is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!isLoggedIn) {
        toast.info('Please sign in to submit a recipe');
        router.push('/signup');
        return;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  const handleSubmitRecipe = async (recipeData: Recipe) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication required');
      return;
    }

    try {
      const response = await fetch(apiUrl('api/recipes'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(recipeData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit recipe');
      }

      const result = await response.json();
      toast.success('Recipe submitted successfully!');
      setIsModalOpen(false);
      
      // Redirect to the new recipe page if ID is provided
      if (result.recipe?._id) {
        router.push(`/recipes/${result.recipe._id}`);
      } else {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit recipe');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <Header />
        
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div>
            <ChefHat className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Share Your Recipe
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Welcome back, {user?.fullName}! Ready to share your culinary creation with the world?
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
            Let&apos;s Get Cooking!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Share your favorite recipe with our community. Whether it&apos;s a family tradition, 
            a creative invention, or a perfected classic, we&apos;d love to see what you&apos;ve been cooking up!
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
              Reach Food Lovers
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Share your recipe with thousands of cooking enthusiasts
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
              Easy Process
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Simple form to add ingredients, steps, and photos
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
              Get Recognition
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Receive ratings and reviews from the community
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'Caveat, cursive' }}
          >
            Submit Your Recipe
          </button>
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-green-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center" style={{ fontFamily: 'Caveat, cursive' }}>
            Tips for a Great Recipe Submission
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                📸 High-Quality Photos
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Use good lighting and show the finished dish from an appealing angle
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                📝 Clear Instructions
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Write step-by-step instructions that are easy to follow
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                🥄 Precise Measurements
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Include exact quantities and cooking times for best results
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                💡 Personal Touch
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Share the story behind your recipe or any special tips
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Recipe Modal */}
      <AddRecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitRecipe}
      />

      <Footer />
    </div>
  );
}
