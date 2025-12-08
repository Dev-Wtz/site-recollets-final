import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ContactFloat from "./components/ContactFloat";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Les Récollets - Une Tradition d'Excellence",
  description: "Ensemble Scolaire Privé Les Récollets à Longwy. Enseignement d'excellence de la Maternelle au Lycée Professionnel. 46 classes, tradition catholique depuis des générations.",
  keywords: ["Les Récollets", "École Longwy", "Collège Longwy", "Lycée Longwy", "Enseignement privé", "École catholique", "Longwy", "Meurthe-et-Moselle", "Éducation"],
  authors: [{ name: "Les Récollets" }],
  creator: "Les Récollets",
  publisher: "Les Récollets",
  metadataBase: new URL('https://site-recollets-final.vercel.app'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Les Récollets - Une Tradition d'Excellence",
    description: "Ensemble Scolaire Privé Les Récollets à Longwy. Enseignement d'excellence de la Maternelle au Lycée Professionnel.",
    url: 'https://site-recollets-final.vercel.app',
    siteName: 'Les Récollets',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Les Récollets - Une Tradition d'Excellence",
    description: "Ensemble Scolaire Privé Les Récollets à Longwy. Enseignement d'excellence de la Maternelle au Lycée Professionnel.",
  },
  verification: {
    google: undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
        <ContactFloat />
      </body>
    </html>
  );
}
