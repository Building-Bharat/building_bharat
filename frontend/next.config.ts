import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/apply",
        destination:
          "https://unstop.com/p/political-consulting-and-public-policy-cohort-building-bharat-academy-1771064",
        permanent: false,
      },
    ];
  },
  images: {
    // This allows Next.js to serve images from the public folder
    // and still optimize them with next/image
    unoptimized: false, // Set true if you don't want Next to process them
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost', // Optional for dev
      },
      {
        protocol: 'https',
        hostname: 'yourdomain.com', // Replace with your production domain if needed
      },
    ],
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
