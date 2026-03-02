"use client";

/**
 * Lien d'évitement pour l'accessibilité (obligation RGAA / loi 2025).
 * Permet aux utilisateurs au clavier et lecteurs d'écran d'aller directement au contenu principal.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link font-[var(--font-inter)] text-sm bg-[#8C1515] text-white px-4 py-3 fixed top-0 left-0 z-[200] -translate-y-full focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#8C1515] transition-transform"
    >
      Aller au contenu principal
    </a>
  );
}
