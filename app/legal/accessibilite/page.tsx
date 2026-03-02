"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CONTAINER_CLASS, SECTION_PADDING, FOOTER, LEGAL } from "@/app/lib/constants";

export default function AccessibilitePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/legal/accessibilite" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Déclaration d&apos;accessibilité
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-6" />
            <p className="font-[var(--font-inter)] text-base text-gray-600 text-center max-w-2xl mx-auto">
              <strong>{LEGAL.editorName}</strong> s&apos;engage à rendre son site internet accessible conformément à
              l&apos;article 47 de la loi n° 2005-102 du 11 février 2005 et au Référentiel général d&apos;amélioration de
              l&apos;accessibilité (RGAA).
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                État de conformité
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Ce site est en cours d&apos;amélioration pour atteindre un niveau d&apos;accessibilité conforme au RGAA 4.1
                (niveau AA dans la mesure du possible). Nous nous efforçons de respecter les critères suivants :
                structure des pages (titres, landmarks), contraste des couleurs, taille des textes, navigation au
                clavier, lien d&apos;évitement « Aller au contenu principal », alternatives textuelles aux images, formulaires
                labellisés.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                Technologies utilisées
              </h2>
              <ul className="list-disc pl-6 space-y-2 font-[var(--font-inter)] text-sm lg:text-base text-gray-700">
                <li>HTML5, CSS3, JavaScript (React / Next.js)</li>
                <li>Structure sémantique (titres, sections, navigation)</li>
                <li>Attributs ARIA lorsque nécessaire</li>
                <li>Respect des préférences utilisateur (réduction des animations via prefers-reduced-motion)</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                Contenus non accessibles
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Certains contenus tiers (vidéos embarquées, documents PDF historiques) peuvent ne pas être encore
                entièrement accessibles. Nous nous efforçons de fournir des alternatives (transcription, résumé) ou de
                les remplacer progressivement par des contenus accessibles.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                Amélioration et contact
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Si vous rencontrez un problème d&apos;accessibilité sur ce site (page inaccessible, contenu illisible,
                difficulté à naviguer), merci de nous le signaler par courriel ou par courrier. Nous nous engageons à
                vous répondre et à corriger les dysfonctionnements dans les meilleurs délais.
              </p>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                <strong>Contact :</strong>{" "}
                <a href={`mailto:${FOOTER.email}`} className="text-[#8C1515] hover:underline break-all">
                  {FOOTER.email}
                </a>
                {" "}| Tél.{" "}
                <a href={`tel:${FOOTER.phone}`} className="text-[#8C1515] hover:underline">
                  {FOOTER.phoneDisplay}
                </a>
                {" "}| {FOOTER.address}, {FOOTER.zipCity}.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                Voies de recours
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Si vous constatez un défaut d&apos;accessibilité nous concernant et que nous ne répondons pas de manière
                satisfaisante, vous pouvez en informer le Défenseur des droits ou la Commission de l&apos;Union européenne
                (pour les contenus relevant du droit de l&apos;Union). Défenseur des droits :{" "}
                <a
                  href="https://www.defenseurdesdroits.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C1515] hover:underline"
                >
                  www.defenseurdesdroits.fr
                </a>.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                Schéma pluriannuel et plan d&apos;action
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Un schéma pluriannuel de mise en accessibilité et un plan d&apos;action peuvent être communiqués sur
                demande à l&apos;adresse de contact indiquée ci-dessus.
              </p>
              <p className="font-[var(--font-inter)] text-xs text-gray-500 mt-4">
                Dernière mise à jour de cette déclaration : mars 2025.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
