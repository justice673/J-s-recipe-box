'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FileText, Scale, Users, Shield, AlertTriangle, Heart } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/j's recipe box .jpg"
            alt="Terms of Service - J's Recipe Box"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
            unoptimized
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
            <Scale className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-2xl" />
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl" style={{ fontFamily: 'Caveat, cursive' }}>
              Terms of Service
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/95 mb-4 drop-shadow-lg" style={{ fontFamily: 'Caveat, cursive' }}>
            Guidelines for Using Our Platform
          </p>
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md" style={{ fontFamily: 'Outfit, sans-serif' }}>
            By using J&apos;s Recipe Box, you agree to abide by these terms and conditions. 
            Please read them carefully to ensure a positive experience for everyone.
          </p>
          <p className="text-sm text-white/80 mt-4 drop-shadow-md" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Introduction */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-transparent rounded-xl p-8 border-l-4 border-green-500">
              <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Welcome to J&apos;s Recipe Box! These Terms of Service govern your use of our recipe sharing platform. 
                By accessing or using our services, you agree to comply with and be bound by these terms. 
                If you do not agree with any part of these terms, please do not use our platform.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Acceptance of Terms
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                By creating an account, accessing, or using J&apos;s Recipe Box, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service and our Privacy Policy. These terms apply 
                to all users, including visitors, registered users, and contributors.
              </p>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  User Accounts
                </h2>
              </div>
              <div className="space-y-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Creation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To use certain features, you must create an account. You agree to provide accurate, complete, 
                    and current information during registration and to update such information to keep it accurate and current.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Security</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account credentials and for all 
                    activities that occur under your account. You agree to notify us immediately of any unauthorized 
                    access or use of your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Termination</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to suspend or terminate your account at any time, with or without notice, 
                    for violation of these terms or for any other reason we deem necessary.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-green-600" fill="currentColor" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  User-Generated Content
                </h2>
              </div>
              <div className="space-y-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Content Ownership</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You retain ownership of any recipes, images, and other content you submit to our platform. 
                    However, by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to 
                    use, display, and distribute your content on our platform.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Content Guidelines</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    You agree not to submit content that:
                  </p>
                  <ul className="space-y-2 text-gray-600 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Violates any laws or regulations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Infringes on intellectual property rights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Contains hate speech, harassment, or offensive material</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Is misleading, fraudulent, or spam</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Contains malicious code or harmful software</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Content Moderation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to review, edit, remove, or refuse to publish any content that violates 
                    these terms or our community guidelines. We are not obligated to monitor all content but may do so at our discretion.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Intellectual Property
                </h2>
              </div>
              <div className="space-y-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <p className="text-gray-600 leading-relaxed">
                  All content on J&apos;s Recipe Box, including text, graphics, logos, images, and software, 
                  is the property of J&apos;s Recipe Box or its content suppliers and is protected by copyright 
                  and other intellectual property laws.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  You may not reproduce, distribute, modify, or create derivative works from our platform 
                  without our express written permission. However, you may share recipes and content from 
                  our platform through social media and other sharing features we provide.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Disclaimers and Limitations
                </h2>
              </div>
              <div className="space-y-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Recipe Accuracy</h3>
                  <p className="text-gray-600 leading-relaxed">
                    While we strive for accuracy, we do not guarantee that recipes, nutritional information, 
                    or cooking instructions are complete, accurate, or safe for all users. You use recipes at your own risk 
                    and should exercise caution, especially regarding food allergies and dietary restrictions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Platform Availability</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We strive to provide uninterrupted service but do not guarantee that our platform will be 
                    available at all times. We may experience downtime for maintenance, updates, or technical issues.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Limitation of Liability</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To the fullest extent permitted by law, J&apos;s Recipe Box shall not be liable for any indirect, 
                    incidental, special, consequential, or punitive damages arising from your use of our platform.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Changes to Terms
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                We reserve the right to modify these Terms of Service at any time. We will notify users of significant 
                changes through email or by posting a notice on our platform. Your continued use of our services after 
                such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Governing Law
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                These Terms of Service shall be governed by and construed in accordance with the laws of Cameroon. 
                Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Cameroon.
              </p>
            </section>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                Questions About These Terms?
              </h2>
              <p className="text-lg mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:fongejustice918@gmail.com" className="underline hover:text-green-200">
                  fongejustice918@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
