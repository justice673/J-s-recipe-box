import React from 'react';
import "./globals.css";
import 'sonner/dist/styles.css';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: "J&apos;s Recipe Box",
  description: "Discover, share, and create amazing recipes with J&apos;s Recipe Box community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <Toaster richColors position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
