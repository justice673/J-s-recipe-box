import React from 'react';
import { Star, User } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Hear from our amazing community of food lovers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              &quot;J&apos;s Recipe Box has transformed my cooking! The recipes are easy to follow and always turn out amazing.&quot;
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-700" />
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>Sarah Johnson</p>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>Home Cook</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              &quot;The community here is incredible. I&apos;ve learned so many new techniques and made great friends!&quot;
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-700" />
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>Mike Chen</p>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>Food Blogger</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              &quot;As a professional chef, I love sharing my recipes here. The platform is beautifully designed!&quot;
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-700" />
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>Emily Rodriguez</p>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>Professional Chef</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
