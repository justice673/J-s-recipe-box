'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddRecipeModal, { Recipe } from '@/components/AddRecipeModal';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { apiUrl } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function SubmitRecipePage() {
  const { isLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const handleSubmitRecipe = async (recipeData: Recipe) => {
    try {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to submit a recipe');
        return;
      }

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
        throw new Error(errData.message || 'Failed to submit recipe');
      }

      toast.success('Recipe submitted successfully! 🎉');
      setShowModal(false);
      router.push('/recipes');
    } catch (err: unknown) {
      let errorMsg = 'Failed to submit recipe';
      if (err instanceof Error) errorMsg = err.message;
      toast.error(errorMsg);
      throw err;
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 font-caveat">Submit Recipe</h1>
            <p className="text-gray-600 font-outfit">Please log in to submit a recipe.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <AddRecipeModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          router.push('/recipes');
        }}
        onSubmit={handleSubmitRecipe}
      />
      <Footer />
    </>
  );
}

