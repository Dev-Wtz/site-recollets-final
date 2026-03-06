"use client";

/**
 * Intercepte les erreurs non gérées au niveau racine (remplace le layout).
 * Doit inclure <html> et <body> car le layout racine n'est pas rendu.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="antialiased bg-white">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <h1 className="font-bold text-2xl text-[#8C1515] mb-4">
              Une erreur est survenue
            </h1>
            <p className="text-gray-700 mb-6">
              Le serveur a rencontré un problème. Veuillez réessayer.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 bg-[#8C1515] text-white font-semibold rounded-lg hover:bg-[#a01919] transition-colors"
            >
              Réessayer
            </button>
            {process.env.NODE_ENV === "development" && error?.message && (
              <pre className="mt-6 p-4 bg-red-50 border border-red-200 rounded text-left text-sm text-red-800 overflow-auto">
                {error.message}
              </pre>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
