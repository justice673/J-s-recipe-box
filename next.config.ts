import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'themewagon.github.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imagesvc.meredithcorp.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'preview.colorlib.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    root: '/home/justice/Desktop/recipe-sharing',
  },
};

export default nextConfig;
