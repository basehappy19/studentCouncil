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
        hostname: 'apistc.basehappy19.com',
        port: '3001',
        pathname: '/Uploads/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
};

export default nextConfig;
