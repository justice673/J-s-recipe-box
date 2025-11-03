'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Shield, Lock, Eye, UserCheck, FileText, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/j's recipe box .jpg"
            alt="Privacy Policy - J's Recipe Box"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1920&h=1080&fit=crop';
            }}
          />
        </div>

        {/* Glass Overlay */}
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[0.5px]"></div>
        
        <div className="relative z-30 max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Shield className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-2xl" />
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl" style={{ fontFamily: 'Caveat, cursive' }}>
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/95 mb-4 drop-shadow-lg" style={{ fontFamily: 'Caveat, cursive' }}>
            Your Privacy Matters to Us
          </p>
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md" style={{ fontFamily: 'Outfit, sans-serif' }}>
            We are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your information.
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
                At J&apos;s Recipe Box, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our recipe sharing platform. Please read this 
                policy carefully to understand our practices regarding your personal data.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you create an account, we collect information such as your name, email address, and profile picture. 
                    This information is used to personalize your experience and enable features like saving favorite recipes.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Recipe Data</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you submit recipes, we collect the recipe content, images, and any associated metadata. 
                    This information is displayed publicly on our platform as intended by you.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Usage Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We automatically collect information about how you interact with our platform, including pages visited, 
                    recipes viewed, and features used. This helps us improve our services and user experience.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  How We Use Your Information
                </h2>
              </div>
              <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span>To provide, maintain, and improve our services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span>To personalize your experience and show you relevant content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span>To communicate with you about your account and our services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span>To analyze usage patterns and improve platform functionality</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span>To detect, prevent, and address technical issues and security threats</span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Data Security
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                We implement appropriate technical and organizational security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Encryption of data in transit and at rest</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Regular security assessments and updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Access controls and authentication protocols</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Secure infrastructure and hosting services</span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Your Rights and Choices
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                You have the right to:
              </p>
              <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Access</strong> your personal information and request a copy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Update</strong> or correct inaccurate information in your account</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Delete</strong> your account and associated data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Opt-out</strong> of certain data collection and marketing communications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Request</strong> data portability in a machine-readable format</span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Cookies and Tracking Technologies
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, 
                and personalize content. You can control cookie preferences through your browser settings, though 
                this may affect some functionality of our platform.
              </p>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                  Third-Party Services
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Our platform may integrate with third-party services for features like image hosting, analytics, 
                and authentication. These services have their own privacy policies, and we encourage you to review them. 
                We are not responsible for the privacy practices of third-party services.
              </p>
            </section>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                Questions About Privacy?
              </h2>
              <p className="text-lg mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                If you have any questions or concerns about this Privacy Policy or our data practices, 
                please contact us at <a href="mailto:fongejustice918@gmail.com" className="underline hover:text-green-200">fongejustice918@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
