import { SITE_URL } from "@/app/lib/constants";

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Les Récollets',
  alternateName: 'Ensemble Scolaire Privé Les Récollets',
  description:
    "Ensemble Scolaire Privé Les Récollets à Longwy. Enseignement d'excellence de la Maternelle au Lycée Professionnel. 46 classes, tradition catholique depuis des générations.",
  url: SITE_URL,
  logo: `${SITE_URL}/hero.jpg`,
  image: `${SITE_URL}/hero.jpg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Longwy',
    addressRegion: 'Meurthe-et-Moselle',
    addressCountry: 'FR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Admissions',
    areaServed: 'FR',
  },
  sameAs: [],
  educationalCredentialAwarded: [
    'Baccalauréat',
    'Brevet des collèges',
    'CAP',
    'Baccalauréat Professionnel',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Formations',
    itemListElement: ['Maternelle', 'Primaire', 'Collège', 'Lycée Général et Technologique', 'Lycée Professionnel'].map(
      (name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Course', name },
      }),
    ),
  },
};

const schoolSchema = {
  '@context': 'https://schema.org',
  '@type': 'School',
  name: 'Les Récollets',
  description: 'Ensemble Scolaire Privé Les Récollets à Longwy',
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Longwy',
    addressRegion: 'Meurthe-et-Moselle',
    addressCountry: 'FR',
  },
};

export default function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }} />
    </>
  );
}
