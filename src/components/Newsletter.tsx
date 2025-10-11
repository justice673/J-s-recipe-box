'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="relative py-20 px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-10">
        <Image
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop"
          alt="Newsletter background"
          fill
          className="object-cover object-center"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/1920x1080/e5e7eb/6b7280?text=Newsletter+Background';
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-30 max-w-4xl mx-auto text-center">
        <Mail className="w-16 h-16 text-white mx-auto mb-6" />
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: 'Caveat, cursive' }}>
          Subscribe to Our Newsletter
        </h2>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Get the latest recipes, cooking tips, and food trends delivered straight to your inbox every week.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          />
          <button className="bg-green-600 text-white px-6 py-3 font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2" style={{ fontFamily: 'Caveat, cursive' }}>
            Subscribe
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-white text-sm mt-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          No spam, unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
