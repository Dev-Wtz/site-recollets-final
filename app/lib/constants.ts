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
    week: "Lundi au Vendredi : 8h – 17h",
    wednesday: "Mercredi : 8h – 12h",
    weekend: "Samedi, Dimanche et Jours Fériés : Fermé",
  },
} as const;

/**
 * Données légales (LCEN, RGPD, CGU).
 * À compléter : voir LEGAL_QUESTIONNAIRE.md ou la section « Questions » en bas de ce fichier.
 */
export const LEGAL = {
  /** Dénomination exacte de l'entité éditrice du site */
  editorName: "Ensemble Scolaire Privé Les Récollets",
  /** Forme juridique */
  legalForm: "OGEC",
  /** Siège social – adresse complète */
  headquarters: "44 rue du Général Pershing, 54400 Longwy",
  /** Numéro SIRET (14 chiffres) */
  siret: "933 664 674 00019",
  /** RCS (si applicable) – vide si pas inscrit */
  rcs: "",
  /** Capital social (si société) – vide pour OGEC */
  capital: "",
  /** Directeur de la publication */
  publicationDirector: "M. FRATINI, Chef d'établissement",
  /** Hébergeur du site */
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
  },
  /** Contact pour les demandes RGPD / données personnelles */
  privacyContact: "Devwtz@gmail.com",
  /** Délégué à la Protection des Données (optionnel) */
  dpo: "",
} as const;

/** Téléphone et email du secrétariat de l'ensemble scolaire – utilisés pour toutes les structures */
const SECRETARIAT_ENSEMBLE = {
  phone: "03 82 25 99 20",
  phoneTel: "0382259920",
  email: "accueil.ensemblescolaire@lesrecollets.org",
} as const;

/** Contact secrétariat et vie scolaire par établissement */
export const STRUCTURE_CONTACTS = {
  ecole: {
    secretariat: SECRETARIAT_ENSEMBLE,
    vieScolaire: { phone: "03 82 25 99 20", phoneTel: "0382259920", email: "viescolaire.ecole@lesrecollets.org" },
  },
  college: {
    secretariat: SECRETARIAT_ENSEMBLE,
    vieScolaire: { phone: "03 82 25 99 20", phoneTel: "0382259920", email: "viescolaire.college@lesrecollets.org" },
  },
  lycee: {
    secretariat: SECRETARIAT_ENSEMBLE,
    vieScolaire: { phone: "03 82 25 99 23", phoneTel: "0382259923", email: "vie-scolaire-lycee@lesrecollets.org" },
  },
  lyceePro: {
    secretariat: SECRETARIAT_ENSEMBLE,
    vieScolaire: { phone: "03 82 23 19 36", phoneTel: "0382231936", email: "vie-scolaire-lp@lesrecollets.org" },
  },
} as const;
