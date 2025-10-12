'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
        <Header />
        
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div>
            <Shield className="w-12 h-12 text-white mx-auto mb-4" />
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
              Privacy Policy
            </h1>
            <p className="text-lg text-white/90" style={{ fontFamily: 'Outfit, sans-serif' }}>
              How we protect and handle your information
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <p className="text-gray-600 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
              At J&apos;s Recipe Box, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Information We Collect
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Personal Information
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <li>Full name and email address (when you create an account)</li>
                  <li>Profile information you choose to provide</li>
                  <li>Recipe content, reviews, and comments you submit</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Usage Information
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <li>Pages you visit and features you use</li>
                  <li>Search queries and preferences</li>
                  <li>Device information and IP address</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                How We Use Your Information
              </h2>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <li>To provide and maintain our recipe sharing platform</li>
              <li>To personalize your experience and show relevant content</li>
              <li>To communicate with you about your account and our services</li>
              <li>To improve our website and develop new features</li>
              <li>To ensure security and prevent fraud</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Information Sharing and Disclosure
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Data Security
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Cookies and Similar Technologies
            </h2>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. 
              You can control cookies through your browser settings.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Updates to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the &quot;Last Updated&quot; date at the top of this policy.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <p>Email: <a href="mailto:fongejustice918@gmail.com" className="text-green-600 hover:text-green-700">fongejustice918@gmail.com</a></p>
              <p>Phone: <a href="tel:+237673746133" className="text-green-600 hover:text-green-700">+237 673 746 133</a></p>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            style={{ fontFamily: 'Caveat, cursive' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg font-semibold">Back to Home</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
