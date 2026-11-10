import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  images: {
    remotePatterns: [
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
