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
      {
        protocol: 'https',
        hostname: 'studentownschool.basehappy19.site',
        port: '',
        pathname: '/px/Uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'sc.phukhieo.ac.th',
        port: '',
        pathname: '/px/Uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'sc.phukhieo.ac.th',
        port: '',
        pathname: '/api/Uploads/**',
      }
    ],
    domains: ['studentownschool.basehappy19.site']
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
};

export default nextConfig;
