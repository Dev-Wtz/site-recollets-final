"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CONTAINER_CLASS, SECTION_PADDING, FOOTER, LEGAL, SITE_URL } from "@/app/lib/constants";

function LegalLine({
  label,
  value,
  optional = false,
}: {
  label: string;
  value: string;
  optional?: boolean;
}) {
  if (optional && !value.trim()) return null;
  return (
    <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
      <span className="font-semibold text-gray-900">{label} </span>
      {value.trim() || "[À compléter par l'établissement]"}
    </p>
  );
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/legal/mentions-legales" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Mentions légales
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-6" />
            <p className="font-[var(--font-inter)] text-base text-gray-600 text-center max-w-2xl mx-auto">
              Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN),
              les informations ci-dessous sont portées à la connaissance des utilisateurs du site.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                1. Éditeur du site
              </h2>
              <div className="space-y-2">
                <LegalLine label="Dénomination :" value={LEGAL.editorName} />
                <LegalLine label="Forme juridique :" value={LEGAL.legalForm} />
                <LegalLine label="Siège social :" value={LEGAL.headquarters} />
                <LegalLine label="SIRET :" value={LEGAL.siret} optional />
                <LegalLine label="RCS :" value={LEGAL.rcs} optional />
                <LegalLine label="Capital social :" value={LEGAL.capital} optional />
              </div>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                2. Directeur de la publication
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">Responsable de la publication : </span>
                {LEGAL.publicationDirector.trim() || "[À compléter : nom et qualité du responsable, ex. Chef d'établissement]"}
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                3. Hébergement
              </h2>
              <div className="space-y-2">
                <LegalLine label="Hébergeur :" value={LEGAL.host.name} />
                <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-gray-900">Adresse : </span>
                  {LEGAL.host.address}
                </p>
              </div>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                4. Contact
              </h2>
              <div className="space-y-2">
                <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-gray-900">Adresse postale : </span>
                  {FOOTER.address}, {FOOTER.zipCity}
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-gray-900">Téléphone : </span>
                  <a href={`tel:${FOOTER.phone}`} className="text-[#8C1515] hover:underline">
                    {FOOTER.phoneDisplay}
                  </a>
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-gray-900">Courriel : </span>
                  <a href={`mailto:${FOOTER.email}`} className="text-[#8C1515] hover:underline break-all">
                    {FOOTER.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                5. Propriété intellectuelle
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed mb-4">
                L&apos;ensemble du site {SITE_URL}, incluant mais sans s&apos;y limiter : la structure, les textes, les images,
                les logos, les éléments graphiques et logiciels, est protégé par le droit d&apos;auteur, le droit des marques
                et le droit des bases de données. Toute reproduction, représentation, modification ou exploitation, totale
                ou partielle, sans autorisation écrite préalable de l&apos;éditeur, est interdite et constitutive d&apos;une
                contrefaçon.
              </p>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                Les marques et logos figurant sur le site sont des marques déposées. Toute reproduction sans autorisation
                est interdite.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1515] pl-6">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-[#8C1515] mb-4">
                6. Limitation de responsabilité
              </h2>
              <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site.
                Toutefois, l&apos;éditeur ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations
                mises à disposition. En conséquence, l&apos;éditeur décline toute responsabilité pour toute imprécision,
                inexactitude ou omission portant sur des informations disponibles sur ce site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
