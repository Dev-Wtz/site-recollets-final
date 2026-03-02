import { MetadataRoute } from 'next';

const BASE_URL = 'https://site-recollets-final.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: 'weekly' | 'monthly' | 'yearly';
    priority: number;
  }> = [
    // Accueil
    { path: '', changeFrequency: 'weekly', priority: 1 },

    // Structures
    { path: '/structures/ecole', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/structures/college', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/structures/lycee-general-et-technologique', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/structures/lycee-professionnel', changeFrequency: 'monthly', priority: 0.9 },

    // Administration
    { path: '/administration/reglement', changeFrequency: 'yearly', priority: 0.8 },
    { path: '/administration/tarif', changeFrequency: 'yearly', priority: 0.8 },
    { path: '/administration/taux-reussite', changeFrequency: 'yearly', priority: 0.8 },
    { path: '/administration/fournitures-scolaires', changeFrequency: 'yearly', priority: 0.7 },

    // Restauration
    { path: '/restauration/maternelle', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/restauration/cantine', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/restauration/cafeteria', changeFrequency: 'weekly', priority: 0.7 },

    // Sport
    { path: '/sport/calendrier-sportif', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/sport/resultats-sportifs', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/sport/inscription-unss', changeFrequency: 'yearly', priority: 0.6 },

    // Activités
    { path: '/activites/animation', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/activites/sorties-scolaires', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/activites/les-choucas', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/activites/ateliers', changeFrequency: 'weekly', priority: 0.6 },

    // Pages légales
    { path: '/legal/mentions-legales', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/legal/confidentialite', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/legal/cgu', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/legal/cookies', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/legal/charte-ugc', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/legal/accessibilite', changeFrequency: 'yearly', priority: 0.4 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
