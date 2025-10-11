import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Copyright } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="J's Recipe Box Logo" 
                className="w-10 h-10"
              />
              <h3 className="text-3xl font-bold text-green-400" style={{ fontFamily: 'Caveat, cursive' }}>
                J&apos;s Recipe Box
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Where every recipe tells a story. Join our community of food lovers and discover incredible recipes from around the world.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer">
                <Youtube className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-green-400" style={{ fontFamily: 'Caveat, cursive' }}>
              Quick Links
            </h4>
            <ul className="space-y-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Browse Recipes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Submit Recipe</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Recipe Categories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Cooking Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-green-400" style={{ fontFamily: 'Caveat, cursive' }}>
              Contact Us
            </h4>
            <div className="space-y-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-green-400 mr-3" />
                <a href="mailto:fongejustice918@gmail.com" className="text-gray-300 hover:text-green-400 transition-colors">
                  fongejustice918@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-green-400 mr-3" />
                <a href="tel:+237673746133" className="text-gray-300 hover:text-green-400 transition-colors">
                  +237 673 746 133
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-green-400 mr-3" />
                <span className="text-gray-300">Cameroon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <Copyright className="w-4 h-4 inline mr-1" /> {new Date().getFullYear()} J&apos;s Recipe Box. All rights reserved. Made with <Heart className="w-4 h-4 text-green-400 inline fill-current" /> for food lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
