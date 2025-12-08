import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  /* La ligne ci-dessous corrige l'erreur de build sur Next.js 16 */
  // @ts-expect-error - Correction temporaire pour Vercel/Turbopack
  turbopack: {},
};

export default nextConfig;