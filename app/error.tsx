"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur dans un service de monitoring en production
    console.error("Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl font-bold text-[#8C1515] mb-4">
            Oups !
          </h1>
          <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-6" />
          <p className="font-[var(--font-inter)] text-lg sm:text-xl text-gray-700 mb-8">
            Une erreur inattendue s&apos;est produite.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block px-8 py-3 bg-[#8C1515] text-white font-[var(--font-inter)] font-semibold rounded-lg hover:bg-[#a01919] transition-colors"
          >
            Réessayer
          </button>
          <div>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-gray-200 text-gray-800 font-[var(--font-inter)] font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="font-[var(--font-inter)] text-sm text-red-800 font-mono">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
