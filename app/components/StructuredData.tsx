export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Les Récollets",
    "alternateName": "Ensemble Scolaire Privé Les Récollets",
    "description": "Ensemble Scolaire Privé Les Récollets à Longwy. Enseignement d'excellence de la Maternelle au Lycée Professionnel. 46 classes, tradition catholique depuis des générations.",
    "url": "https://site-recollets-final.vercel.app",
    "logo": "https://site-recollets-final.vercel.app/hero.jpg",
    "image": "https://site-recollets-final.vercel.app/hero.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Longwy",
      "addressRegion": "Meurthe-et-Moselle",
      "addressCountry": "FR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Admissions",
      "areaServed": "FR"
    },
    "sameAs": [],
    "educationalCredentialAwarded": [
      "Baccalauréat",
      "Brevet des collèges",
      "CAP",
      "Baccalauréat Professionnel"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Formations",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Maternelle"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Primaire"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Collège"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Lycée Général et Technologique"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Lycée Professionnel"
          }
        }
      ]
    }
  };

  const schoolSchema = {
    "@context": "https://schema.org",
    "@type": "School",
    "name": "Les Récollets",
    "description": "Ensemble Scolaire Privé Les Récollets à Longwy",
    "url": "https://site-recollets-final.vercel.app",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Longwy",
      "addressRegion": "Meurthe-et-Moselle",
      "addressCountry": "FR"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
      />
    </>
  );
}

