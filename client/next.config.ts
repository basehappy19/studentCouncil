import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/Uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'studentownschool.com',
        port: '',
        pathname: '/px/Uploads/**',
      },
    ],
    domains: ['studentownschool.com']
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
};

export default nextConfig;
