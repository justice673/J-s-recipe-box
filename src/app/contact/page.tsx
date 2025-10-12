'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { apiUrl } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl('api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <Image
          src="https://images.unsplash.com/photo-1516985080664-ed2fc6a32937?w=1200&h=400&fit=crop"
          alt="Contact us"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        
        <Header />
        
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Caveat, cursive' }}>
              Contact Information
            </h2>
            <p className="text-gray-600 text-lg mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Have a question about a recipe? Want to collaborate? Or just want to say hello? 
              We&apos;re here to help and would love to hear from you!
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Caveat, cursive' }}>
                    Email Us
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    <a href="mailto:fongejustice918@gmail.com" className="text-green-600 hover:text-green-700">
                      fongejustice918@gmail.com
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Caveat, cursive' }}>
                    Call Us
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    <a href="tel:+237673746133" className="text-green-600 hover:text-green-700">
                      +237 673 746 133
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Monday - Friday, 9:00 AM - 6:00 PM (GMT+1)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Caveat, cursive' }}>
                    Location
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Cameroon
                  </p>
                  <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Central Africa
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    How do I submit a recipe?
                  </h4>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Sign up for an account and use the &quot;Submit Recipe&quot; feature. We review all submissions to ensure quality.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Can I edit my recipes after submission?
                  </h4>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Yes! You can edit your recipes from your profile page after they&apos;ve been published.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Is J&apos;s Recipe Box free to use?
                  </h4>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Yes! Creating an account and browsing recipes is completely free.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Caveat, cursive' }}>
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 placeholder-gray-500"
                  placeholder="Your full name"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 placeholder-gray-500"
                  placeholder="your.email@example.com"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Question</option>
                  <option value="recipe">Recipe Support</option>
                  <option value="account">Account Issues</option>
                  <option value="business">Business Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-vertical text-gray-900 placeholder-gray-500"
                  placeholder="Tell us how we can help you..."
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    We respect your privacy
                  </p>
                  <p className="text-blue-700 text-sm mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Your information is secure and will only be used to respond to your inquiry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
