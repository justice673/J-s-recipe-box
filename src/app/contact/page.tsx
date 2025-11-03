'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/contact.webp"
            alt="Contact J's Recipe Box"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&h=1080&fit=crop';
            }}
          />
        </div>

        {/* Glass Overlay */}
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[0.5px]"></div>
        
        <div className="relative z-30 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6" style={{ fontFamily: 'Caveat, cursive' }}>
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-4 drop-shadow-lg" style={{ fontFamily: 'Caveat, cursive' }}>
            We&apos;d Love to Hear From You
          </p>
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Have a question, suggestion, or just want to say hello? Reach out to us—we&apos;re always here to help!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Send Us a Message
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 md:p-10 border border-green-200">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8" style={{ fontFamily: 'Caveat, cursive' }}>
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Caveat, cursive' }}>
                        Email Us
                      </h3>
                      <a 
                        href="mailto:fongejustice918@gmail.com" 
                        className="text-gray-600 hover:text-green-600 transition-colors"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        fongejustice918@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Caveat, cursive' }}>
                        Call Us
                      </h3>
                      <a 
                        href="tel:+237673746133" 
                        className="text-gray-600 hover:text-green-600 transition-colors"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        +237 673 746 133
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Caveat, cursive' }}>
                        Location
                      </h3>
                      <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Cameroon
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Caveat, cursive' }}>
                        Response Time
                      </h3>
                      <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        We typically respond within 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Card */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                  Other Ways to Reach Us
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  You can also connect with us through our social media channels or join our community 
                  to stay updated with the latest recipes, cooking tips, and culinary inspiration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
