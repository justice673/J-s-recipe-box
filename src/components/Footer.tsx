import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Copyright } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
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
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-green-400" style={{ fontFamily: 'Caveat, cursive' }}>
              Quick Links
            </h4>
            <ul className="space-y-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <li><Link href="/recipes" className="text-gray-300 hover:text-green-400 transition-colors">Browse Recipes</Link></li>
              <li><Link href="/submit-recipe" className="text-gray-300 hover:text-green-400 transition-colors">Submit Recipe</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact Us</Link></li>
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

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <Copyright className="w-4 h-4 inline mr-1" /> {new Date().getFullYear()} J&apos;s Recipe Box. All rights reserved. Made with <Heart className="w-4 h-4 text-green-400 inline fill-current" /> for food lovers everywhere.
            </p>
            <div className="flex gap-6 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <Link href="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
