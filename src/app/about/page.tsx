'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Target, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop"
          alt="Cooking together"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <Header />
        
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              About J&apos;s Recipe Box
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Where every recipe tells a story and every meal brings people together
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Caveat, cursive' }}>
              Our Story
            </h2>
            <p className="text-gray-600 text-lg mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              J&apos;s Recipe Box was born from a simple belief: that great food has the power to bring people together, 
              create lasting memories, and share cultural traditions across generations.
            </p>
            <p className="text-gray-600 text-lg mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Founded with passion for culinary excellence and community building, we&apos;ve created a platform where 
              home cooks, professional chefs, and food enthusiasts can discover, share, and celebrate the art of cooking.
            </p>
            <p className="text-gray-600 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
              From traditional family recipes passed down through generations to innovative modern creations, 
              every recipe in our collection tells a unique story and represents the diverse tapestry of global cuisine.
            </p>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1556909114-54dc0d9b0a9b?w=600&h=400&fit=crop"
              alt="Our cooking story"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Our Mission
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              To make cooking accessible, enjoyable, and meaningful for everyone by providing a platform 
              where food lovers can discover, share, and celebrate culinary traditions from around the world.
            </p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Community First
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We believe in the power of community. Our platform connects food enthusiasts, 
              fostering relationships and cultural exchange through the universal language of food.
            </p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Quality & Authenticity
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Every recipe is carefully curated to ensure authenticity and quality. 
              We celebrate both traditional techniques and innovative approaches to cooking.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-gray-50 rounded-xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12" style={{ fontFamily: 'Caveat, cursive' }}>
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📚</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                Recipe Collection
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Thousands of tested recipes from cuisines around the world
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">👥</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                Community
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Connect with fellow food lovers and share your culinary journey
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">⭐</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                Reviews & Ratings
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Real feedback from real cooks to help you choose the perfect recipe
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📱</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                Easy Access
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Access your favorite recipes anytime, anywhere on any device
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-green-600 rounded-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
            Join Our Culinary Community
          </h2>
          <p className="text-xl text-green-100 mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Start your cooking journey with us today and discover a world of flavors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors" style={{ fontFamily: 'Caveat, cursive' }}>
                Get Started
              </button>
            </Link>
            <Link href="/recipes">
              <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors" style={{ fontFamily: 'Caveat, cursive' }}>
                Browse Recipes
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
