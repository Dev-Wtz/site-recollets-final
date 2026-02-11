import { Metadata } from "next";
import { SITE_URL } from "./constants";

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}

/**
 * Génère des métadonnées optimisées pour le SEO
 */
export function generatePageMetadata({
  title,
  description,
  path,
  image = `${SITE_URL}/hero.jpg`,
  keywords = [],
}: PageMetadataProps): Metadata {
  const fullTitle = `${title} | Les Récollets`;
  const url = `${SITE_URL}${path}`;

  const defaultKeywords = [
    "Les Récollets",
    "École Longwy",
    "Collège Longwy",
    "Lycée Longwy",
    "Enseignement privé",
    "École catholique",
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Les Récollets",
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
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
  };
}
