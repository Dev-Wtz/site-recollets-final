import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

/* ────────────────────────────────────────────
   Polices
   ──────────────────────────────────────────── */

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
  adjustFontFallback: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "arial"],
  adjustFontFallback: true,
});

/* ────────────────────────────────────────────
   Métadonnées
   ──────────────────────────────────────────── */

import { SITE_URL } from "@/app/lib/constants";

const SITE_DESCRIPTION =
  "Ensemble Scolaire Privé Les Récollets à Longwy. Enseignement d'excellence de la Maternelle au Lycée Professionnel. 46 classes, tradition catholique depuis des générations.";

export const metadata: Metadata = {
  title: "Les Récollets - Ensemble Scolaire Privé",
  description: SITE_DESCRIPTION,
  keywords: [
    "Les Récollets", "École Longwy", "Collège Longwy", "Lycée Longwy",
    "Enseignement privé", "École catholique", "Longwy", "Meurthe-et-Moselle", "Éducation",
  ],
  authors: [{ name: "Les Récollets" }],
  creator: "Les Récollets",
  publisher: "Les Récollets",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Les Récollets - Ensemble Scolaire Privé",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Les Récollets",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Ensemble Scolaire Privé Les Récollets - Campus principal à Longwy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Récollets - Ensemble Scolaire Privé",
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/hero.jpg`],
  },
};

/* ────────────────────────────────────────────
   Layout racine
   ──────────────────────────────────────────── */

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#8C1515" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="FR-54" />
        <meta name="geo.placename" content="Longwy" />
        <meta name="geo.position" content="49.5214;5.7603" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
