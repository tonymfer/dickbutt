import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.dickbutt.info',
        pathname: '/v1/**',
      },
      {
        // R2 public bucket fallback (pub-xxx.r2.dev format)
        protocol: 'https',
        hostname: '*.r2.dev',
        pathname: '/v1/**',
      },
    ],
  },
};

export default nextConfig;
