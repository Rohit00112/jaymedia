import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['firebase-admin'],
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: '/register',
        destination: '/events',
        permanent: false,
      },
      {
        source: '/register/:slug',
        destination: '/events/:slug',
        permanent: false,
      },
      {
        source: '/services',
        destination: '/events',
        permanent: false,
      },
      {
        source: '/services/:slug',
        destination: '/events',
        permanent: false,
      },
      {
        source: '/admin/registrations',
        destination: '/admin',
        permanent: false,
      },
      {
        source: '/admin/services',
        destination: '/admin',
        permanent: false,
      },
      {
        source: '/team/jay-raj-roy',
        destination: '/team/jayrajroy',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.jaymediamanagement.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
