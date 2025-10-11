'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import { apiUrl } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
            const res = await fetch(apiUrl('api/password/forgot'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send reset link');
      setStatus('success');
      setMessage('A password reset link has been sent to your email if it exists in our system.');
    } catch (err: unknown) {
      let errorMsg = 'Failed to send reset link';
      if (err instanceof Error) errorMsg = err.message;
      setStatus('error');
      setMessage(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      {/* Back to Login Link */}
      <Link 
        href="/login" 
        className="absolute top-6 left-6 flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
        style={{ fontFamily: 'Caveat, cursive' }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-lg font-semibold">Back to Login</span>
      </Link>

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          
          {/* Image Side */}
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop"
              alt="Delicious food"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay with branding */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                  Reset Your Password
                </h2>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Image 
                    src="/logo.png" 
                    alt="J's Recipe Box Logo" 
                    width={64}
                    height={64}
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent" style={{ fontFamily: 'Caveat, cursive' }}>
                    J&apos;s Recipe Box
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                  Forgot Password?
                </h1>
                <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  No worries! Enter your email and we&apos;ll send you a reset link
                </p>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 placeholder-gray-500"
                      placeholder="Enter your email address"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                      required
                    />
                  </div>
                </div>

                {/* Status Message */}
                {status === 'success' && (
                  <div className="text-green-600 text-center font-semibold">{message}</div>
                )}
                {status === 'error' && (
                  <div className="text-red-600 text-center font-semibold">{message}</div>
                )}

                {/* Reset Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
                  style={{ fontFamily: 'Caveat, cursive' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
                </button>

                {/* Back to Login */}
                <div className="text-center">
                  <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Remember your password?{' '}
                    <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
