/** Constantes partagées du site Les Récollets */

export const SITE_URL = "https://site-recollets-final.vercel.app";

export const COLORS = {
  primary: "#8C1515",
  primaryHover: "#a01919",
} as const;

export const CONTAINER_CLASS =
  "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8";

export const SECTION_PADDING = "py-8 sm:py-12 lg:py-16 pt-20 sm:pt-24 lg:pt-32";

export const FOOTER = {
  address: "44 rue du Général Pershing",
  zipCity: "54400 LONGWY",
  phone: "0382259920",
  phoneDisplay: "03 82 25 99 20",
  email: "accueil.ensemblescolaire@lesrecollets.org",
  hours: {
    week: "Lundi au Vendredi : 8h – 12h et 13h – 17h",
    wednesday: "Mercredi : 8h – 12h",
    weekend: "Samedi, Dimanche et Jours Fériés : Fermé",
  },
} as const;

/** Contact secrétariat et vie scolaire par établissement */
export const STRUCTURE_CONTACTS = {
  ecole: {
    secretariat: { phone: "03 82 25 99 20", phoneTel: "0382259920", email: "secretariat.ecole@lesrecollets.org" },
    vieScolaire: { phone: "03 82 25 99 20", phoneTel: "0382259920", email: "viescolaire.ecole@lesrecollets.org" },
  },
  college: {
    secretariat: { phone: "03 82 25 99 20", phoneTel: "0382259920", email: "secretariat.college@lesrecollets.org" },
    vieScolaire: { phone: "03 82 25 99 20", phoneTel: "0382259920", email: "viescolaire.college@lesrecollets.org" },
  },
  lycee: {
    secretariat: { phone: "03 82 25 99 20", phoneTel: "0382259920", email: "secretariat.lycee@lesrecollets.org" },
    vieScolaire: { phone: "03 82 25 99 20", phoneTel: "0382259920", email: "viescolaire.lycee@lesrecollets.org" },
  },
  lyceePro: {
    secretariat: { phone: "03 82 25 99 20", phoneTel: "0382259920", email: "secretariat.lyceepro@lesrecollets.org" },
    vieScolaire: { phone: "03 82 25 99 20", phoneTel: "0382259920", email: "viescolaire.lyceepro@lesrecollets.org" },
  },
} as const;
