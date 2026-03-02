"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CookieBannerTrigger from "@/app/components/CookieBannerTrigger";
import { CONTAINER_CLASS, SECTION_PADDING, LEGAL } from "@/app/lib/constants";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/legal/cookies" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Politique des cookies
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-6" />
            <p className="font-[var(--font-inter)] text-base text-gray-600 text-center max-w-2xl mx-auto">
              Cette page vous informe sur l&apos;utilisation des cookies et traceurs sur le site Les Récollets,
              conformément à la réglementation (RGPD et recommandations CNIL). Vous pouvez{" "}
              <CookieBannerTrigger className="text-[#8C1515] font-medium underline hover:no-underline">
                modifier vos choix à tout moment
              </CookieBannerTrigger>.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                1. Qu’est-ce qu’un cookie ?
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de
                la visite d&apos;un site. Il permet au site de mémoriser des informations (par exemple votre choix de langue
                ou un identifiant de session) pendant une durée limitée. Les traceurs (pixels, identifiants, etc.) relèvent
                de la même logique de suivi et sont soumis aux mêmes règles lorsqu&apos;ils permettent une identification.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                2. Cookies utilisés sur ce site
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Nous utilisons les cookies suivants :
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900">Nom / type</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900">Finalité</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900">Durée</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900">Consentement</th>
                    </tr>
                  </thead>
                  <tbody className="font-[var(--font-inter)] text-gray-700">
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Cookies techniques (session, préférences)</td>
                      <td className="border border-gray-300 px-3 py-2">Fonctionnement du site, mémorisation de vos choix (ex. bandeau cookies)</td>
                      <td className="border border-gray-300 px-3 py-2">Session ou 13 mois max.</td>
                      <td className="border border-gray-300 px-3 py-2">Non requis (intérêt légitime)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Logs serveur</td>
                      <td className="border border-gray-300 px-3 py-2">Sécurité, diagnostic technique</td>
                      <td className="border border-gray-300 px-3 py-2">Conformément à la réglementation (ex. 1 an)</td>
                      <td className="border border-gray-300 px-3 py-2">Intérêt légitime</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Google Analytics</td>
                      <td className="border border-gray-300 px-3 py-2">Mesure d&apos;audience, statistiques de visite (pages vues, provenance, etc.)</td>
                      <td className="border border-gray-300 px-3 py-2">Jusqu&apos;à 14 mois (selon paramétrage)</td>
                      <td className="border border-gray-300 px-3 py-2">Oui — déposés uniquement après votre consentement (bouton « Tout accepter » ou catégorie « Analyse »)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="font-[var(--font-inter)] text-sm text-gray-600 mt-4">
                Les cookies Google Analytics ne sont chargés qu&apos;après que vous ayez accepté les cookies d&apos;analyse dans le bandeau de consentement.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                3. Consentement et refus
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Conformément à la réglementation :
              </p>
              <ul className="list-disc pl-6 space-y-2 font-[var(--font-inter)] text-sm lg:text-base text-gray-700">
                <li>Les cookies strictement nécessaires au fonctionnement du site (ex. session, préférence d&apos;affichage du bandeau cookies) peuvent être déposés sans consentement préalable.</li>
                <li>Les cookies non strictement nécessaires (analytics, publicité, réseaux sociaux) nécessitent votre consentement avant tout dépôt.</li>
              </ul>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mt-4">
                Vous pouvez à tout moment refuser ou retirer votre consentement via les paramètres de votre navigateur
                (gestion des cookies) ou via un outil de gestion des consentements si le site en met un en place. Le
                refus peut entraîner une limitation de certaines fonctionnalités (ex. préférences non mémorisées).
              </p>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mt-4">
                Pour configurer votre navigateur : voir les aides fournies par Chrome, Firefox, Safari, Edge, etc., sur
                la gestion des cookies.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                4. Vos droits et contact
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Pour toute question sur les cookies ou pour exercer vos droits sur vos données personnelles (accès,
                rectification, opposition, etc.), consultez notre{" "}
                <Link href="/legal/confidentialite" className="text-[#8C1515] hover:underline">
                  Politique de confidentialité
                </Link>
                {" "}et contactez-nous à :{" "}
                <a href={`mailto:${LEGAL.privacyContact}`} className="text-[#8C1515] hover:underline break-all">
                  {LEGAL.privacyContact}
                </a>.
                Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                5. Modifications
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Cette politique peut être mise à jour pour refléter l&apos;ajout ou la suppression de cookies. La date de
                dernière mise à jour sera indiquée en bas de page.
              </p>
              <p className="font-[var(--font-inter)] text-xs text-gray-500 mt-4">
                Dernière mise à jour : mars 2025.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
