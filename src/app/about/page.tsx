'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Heart, Users, BookOpen, Globe, Award, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-10">
          <Image
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&h=1080&fit=crop"
            alt="About J's Recipe Box - Food community"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop';
            }}
          />
        </div>

        {/* Glass Overlay */}
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[0.5px]"></div>
        
        <div className="relative z-30 max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Image 
              src="/logo.png" 
              alt="J's Recipe Box Logo" 
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl" style={{ fontFamily: 'Caveat, cursive' }}>
              About J&apos;s Recipe Box
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-white/95 mb-4 drop-shadow-lg" style={{ fontFamily: 'Caveat, cursive' }}>
            Where Every Recipe Tells a Story
          </p>
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md" style={{ fontFamily: 'Outfit, sans-serif' }}>
            A vibrant community where food lovers come together to discover, share, and celebrate the art of cooking. 
            From traditional family recipes to innovative culinary creations, every dish has a story waiting to be told.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Our Story */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-green-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Our Story
              </h2>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-transparent rounded-2xl p-8 md:p-12 border-l-4 border-green-500">
              <p className="text-lg text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                J&apos;s Recipe Box was born from a simple passion: bringing people together through food. 
                We believe that recipes are more than just instructions—they&apos;re memories, traditions, 
                and expressions of love passed down through generations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Whether you&apos;re a seasoned chef or a kitchen beginner, our platform welcomes everyone. 
                We&apos;ve created a space where you can explore diverse cuisines, discover new flavors, 
                and share your own culinary masterpieces with a global community of food enthusiasts.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Join us on this delicious journey, and let&apos;s create something amazing together—one recipe at a time.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-12 text-center">
              <Sparkles className="w-8 h-8 text-green-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                What We Stand For
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-green-600" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                  Passion for Food
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  We celebrate the love and dedication that goes into every dish, honoring both time-tested traditions and bold innovations.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                  Community First
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Our platform thrives on the connections between food lovers, fostering a supportive and inspiring culinary community.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                  Global Diversity
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  We embrace cuisines from every corner of the world, creating a rich tapestry of flavors, cultures, and culinary traditions.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                  Learning & Growth
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Every recipe is an opportunity to learn, experiment, and grow as a cook. We encourage curiosity and culinary exploration.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                  Quality Content
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  We maintain high standards for our recipes, ensuring every dish is well-tested, clearly explained, and delicious.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                  Accessibility
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Cooking should be accessible to everyone. Our platform welcomes cooks of all skill levels and backgrounds.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-10 md:p-16 text-white text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Caveat, cursive' }}>
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
              To inspire, connect, and empower food lovers worldwide by providing a platform where recipes 
              become stories, cooking becomes community, and every meal becomes a celebration.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
