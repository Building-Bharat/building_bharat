import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, 
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure Tailwind CSS is not bundled for client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
