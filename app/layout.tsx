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
  description: "Enseignement Catholique à Longwy",
  metadataBase: new URL('https://site-recollets-final.vercel.app'),
  openGraph: {
    title: "Les Récollets - Une Tradition d'Excellence",
    description: "Enseignement Catholique à Longwy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
        <ContactFloat />
      </body>
    </html>
  );
}
