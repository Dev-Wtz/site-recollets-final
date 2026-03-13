"use client";

import { Download } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/app/lib/constants";

const PDF_TARIFS = "/Images/tarif/Tableau_tarifs_26-27_OGEC.pdf";

export default function TarifPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/administration/tarif" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Tarifs 2026-2027
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>
            
            {/* Texte descriptif */}
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                Retrouvez ci-dessous les tarifs de scolarité pour l&apos;année 2026-2027 de l&apos;Ensemble Scolaire Privé des Récollets.
              </p>
              <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                Pour toute question concernant les tarifs ou les modalités de paiement, n&apos;hésitez pas à nous contacter.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden border border-gray-200 bg-gray-100 min-h-[70vh] sm:min-h-[80vh]">
              <iframe
                src={`${PDF_TARIFS}#view=FitH`}
                title="Tableau des tarifs 2026-2027 - Les Récollets"
                className="w-full h-[70vh] sm:h-[80vh]"
              />
            </div>
            <a
              href={PDF_TARIFS}
              download="Tableau_tarifs_26-27_OGEC.pdf"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#8C1515] text-white rounded-lg hover:bg-[#a01919] transition-colors font-[var(--font-inter)] font-semibold shadow-lg hover:shadow-xl"
            >
              <Download size={20} />
              Télécharger
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
