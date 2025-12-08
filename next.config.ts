import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Option de sécurité pour les images Unsplash */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  /* On retire swcMinify car c'est par défaut maintenant */
};

export default nextConfig;