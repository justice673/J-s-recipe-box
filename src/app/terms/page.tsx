'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, Users, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src="https://preview.colorlib.com/theme/meal/images/img_1.jpg"
          alt="Terms of service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        
        <Header />
        
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
              Terms of Service
            </h1>
            <p className="text-lg text-white/90" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Terms and conditions for using J&apos;s Recipe Box
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
              Welcome to J&apos;s Recipe Box
            </h2>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
              These Terms of Service (&quot;Terms&quot;) govern your use of J&apos;s Recipe Box website and services. 
              By accessing or using our platform, you agree to be bound by these Terms. If you do not agree to these Terms, 
              please do not use our services.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Acceptance of Terms
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
              By creating an account, browsing recipes, or using any part of J&apos;s Recipe Box, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all users of the service, 
              including contributors, browsers, and other users.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              User Accounts
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Account Creation
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Account Responsibilities
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <li>You are solely responsible for all activity under your account</li>
                  <li>You may not share your account credentials with others</li>
                  <li>You may not create multiple accounts to circumvent our policies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Content Guidelines */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Content Guidelines
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Recipe Submissions
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <li>All recipes must be original or properly attributed</li>
                  <li>Recipes should include accurate ingredients and instructions</li>
                  <li>Images must be appropriate and food-related</li>
                  <li>No copyrighted content without permission</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Prohibited Content
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <li>Offensive, harmful, or inappropriate content</li>
                  <li>Spam or promotional content unrelated to cooking</li>
                  <li>False or misleading information</li>
                  <li>Content that violates any laws or regulations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Intellectual Property Rights
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Your Content
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  You retain ownership of the recipes and content you submit. By posting content, you grant us a non-exclusive, 
                  worldwide, royalty-free license to use, display, and distribute your content on our platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Our Content
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  The J&apos;s Recipe Box website, design, logo, and original content are protected by copyright and other intellectual property laws. 
                  You may not use our branding or content without permission.
                </p>
              </div>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                User Conduct
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              You agree not to engage in any of the following activities:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <li>Harassing, threatening, or intimidating other users</li>
              <li>Attempting to hack, disrupt, or damage our services</li>
              <li>Creating fake accounts or impersonating others</li>
              <li>Collecting user information without consent</li>
              <li>Violating any applicable laws or regulations</li>
            </ul>
          </section>

          {/* Privacy and Data */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Privacy and Data Protection
            </h2>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information. 
              By using our services, you agree to the collection and use of information in accordance with our Privacy Policy.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Disclaimers and Limitations
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Recipe Accuracy
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  While we strive to maintain quality, we cannot guarantee the accuracy or safety of user-submitted recipes. 
                  Always use your judgment when preparing food and consider dietary restrictions and food safety guidelines.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Service Availability
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  We provide our services &quot;as is&quot; and cannot guarantee uninterrupted or error-free service. 
                  We may modify or discontinue features at any time.
                </p>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Account Termination
            </h2>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We may suspend or terminate your account if you violate these Terms or engage in harmful activities. 
              You may also delete your account at any time through your profile settings.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Changes to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We may update these Terms from time to time. We will notify you of any significant changes by posting the new Terms on our website. 
              Your continued use of our services after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Questions About These Terms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              If you have any questions about these Terms of Service, please contact us:
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
