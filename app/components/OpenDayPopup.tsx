"use client";

import { useEffect, useState, useCallback } from "react";

export default function OpenDayPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const now = new Date();
    const eventEnd = new Date(2026, 2, 20, 19, 30); // 20 mars 2026, 19h30
    if (now > eventEnd) return;

    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Annonce journée portes ouvertes"
      onClick={close}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-200/60 px-5 py-6 sm:px-8 sm:py-7 text-center transform transition-transform duration-200 ease-out scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 h-8 w-8 rounded-full flex items-center justify-center text-[#8C1515] hover:text-[#a01919] focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2 bg-transparent shadow-[0_0_12px_rgba(140,21,21,0.25)] hover:shadow-[0_0_18px_rgba(140,21,21,0.45)] transition-[color,box-shadow,transform] duration-200 ease-out"
          aria-label="Fermer la fenêtre d'annonce"
        >
          <span
            aria-hidden="true"
            className="text-xl leading-none transition-transform duration-200 ease-out hover:scale-110 hover:rotate-3"
          >
            ×
          </span>
        </button>
        <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-bold text-[#8C1515] mb-3 tracking-wide uppercase">
          Journée portes ouvertes 2026
        </h2>
        <p className="font-[var(--font-inter)] text-base sm:text-lg md:text-xl text-gray-900 font-semibold mb-1">
          Vendredi 20 mars
        </p>
        <p className="font-[var(--font-inter)] text-base sm:text-lg md:text-xl text-gray-900 mb-4 font-semibold">
          De 17h à 19h30
        </p>
        <p className="font-[var(--font-inter)] text-xs sm:text-sm text-gray-700">
          Venez découvrir l&apos;ensemble scolaire Les Récollets, rencontrer les équipes et visiter les lieux.
        </p>
      </div>
    </div>
  );
}

