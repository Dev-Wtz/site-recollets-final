"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CONTAINER_CLASS, SECTION_PADDING, LEGAL, SITE_URL } from "@/app/lib/constants";

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/legal/confidentialite" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Politique de confidentialité
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-6" />
            <p className="font-[var(--font-inter)] text-base text-gray-600 text-center max-w-2xl mx-auto">
              Cette politique décrit la manière dont Les Récollets collecte, utilise et protège vos données personnelles
              dans le cadre du site {new URL(SITE_URL).hostname}, conformément au Règlement général sur la protection des données (RGPD) et à la loi « Informatique et Libertés ».
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                1. Responsable du traitement
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-2">
                Le responsable du traitement des données personnelles est :
              </p>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                <strong>{LEGAL.editorName}</strong>
                <br />
                {LEGAL.headquarters}
                <br />
                Courriel :{" "}
                <a href={`mailto:${LEGAL.privacyContact}`} className="text-[#8C1515] hover:underline break-all">
                  {LEGAL.privacyContact}
                </a>
              </p>
              {LEGAL.dpo.trim() && (
                <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mt-4">
                  <strong>Délégué à la Protection des Données (DPO) :</strong> {LEGAL.dpo}
                </p>
              )}
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                2. Données collectées et finalités
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Dans le cadre de l&apos;utilisation du site, peuvent être collectées :
              </p>
              <ul className="list-disc pl-6 space-y-2 font-[var(--font-inter)] text-sm lg:text-base text-gray-700">
                <li>
                  <strong>Données de connexion et d&apos;usage</strong> (adresse IP, type de navigateur, pages visitées, date et heure) : exploitation technique du site, sécurité, statistiques de fréquentation. Base légale : intérêt légitime.
                </li>
                <li>
                  <strong>Données fournies volontairement</strong> (formulaire de contact, inscription à une activité, etc.) : réponse à votre demande ou gestion de l&apos;activité. Base légale : exécution d&apos;un contrat ou consentement.
                </li>
                <li>
                  <strong>Cookies</strong> : selon la politique indiquée sur notre page{" "}
                  <Link href="/legal/cookies" className="text-[#8C1515] hover:underline">Politique des cookies</Link>.
                </li>
              </ul>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mt-4">
                Les données sont collectées de manière loyale et minimale au regard des finalités poursuivies.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                3. Durée de conservation
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Les données sont conservées pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées,
                puis supprimées ou anonymisées. Les durées précises (notamment pour les cookies et les logs) sont détaillées
                dans la{" "}
                <Link href="/legal/cookies" className="text-[#8C1515] hover:underline">Politique des cookies</Link>.
                Les données de contact et d&apos;inscription sont conservées selon les obligations légales et la durée de la relation (scolarité, activité).
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                4. Destinataires et transferts
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Les données sont destinées aux services internes de l&apos;établissement habilités à traiter votre demande.
                Elles peuvent être transmises à des prestataires techniques (hébergement, maintenance) dans le cadre de
                contrats stricts garantissant la confidentialité et la sécurité. En cas de transfert hors Union européenne,
                des garanties appropriées (clauses types, décisions d&apos;adéquation) sont mises en œuvre.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                5. Vos droits
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 font-[var(--font-inter)] text-sm lg:text-base text-gray-700">
                <li><strong>Droit d&apos;accès</strong> : obtenir la confirmation que des données vous concernant sont traitées et en recevoir une copie.</li>
                <li><strong>Droit de rectification</strong> : faire corriger des données inexactes ou incomplètes.</li>
                <li><strong>Droit à l&apos;effacement</strong> : dans les cas prévus par la loi (consentement, opposition légitime, etc.).</li>
                <li><strong>Droit à la limitation du traitement</strong> : dans les conditions prévues par le RGPD.</li>
                <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement fondé sur l&apos;intérêt légitime.</li>
                <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et couramment utilisé.</li>
              </ul>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à :{" "}
                <a href={`mailto:${LEGAL.privacyContact}`} className="text-[#8C1515] hover:underline break-all">
                  {LEGAL.privacyContact}
                </a>
                {LEGAL.dpo.trim() && <> ou notre DPO : {LEGAL.dpo}</>}.
                Vous pouvez également introduire une réclamation auprès de la CNIL :{" "}
                <a
                  href="https://www.cnil.fr/fr/plaintes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C1515] hover:underline"
                >
                  www.cnil.fr/fr/plaintes
                </a>.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                6. Sécurité
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour protéger vos données
                contre l&apos;accès non autorisé, la perte, la destruction ou l&apos;altération. L&apos;accès aux données
                personnelles est restreint aux personnes habilitées.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                7. Modifications
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Cette politique peut être modifiée pour refléter les évolutions juridiques ou des changements de traitement.
                La date de dernière mise à jour sera indiquée en bas de page. Nous vous invitons à la consulter régulièrement.
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
