"use client";

import { ChevronDown, Download } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import NextImage from "next/image";
import { useShowMoreText } from "@/app/hooks/useShowMoreText";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/app/lib/constants";

const PDF_CANTINE = "/Menu_Cantine.pdf";
const IMAGE_CANTINE = "/Menu_Cantine.webp.webp";

export default function CantinePage() {
  const {
    ref: descriptionRef,
    expanded: showMoreDescription,
    needsShowMore,
    toggle: toggleShowMore,
  } = useShowMoreText(8);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/restauration/cantine" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Menu Restaurant Scolaire
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>

            <div className="max-w-3xl mx-auto mb-12 text-center">
              <div
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? "line-clamp-[5]" : ""}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Le restaurant scolaire des Récollets propose une restauration
                  de qualité. Nos repas sont préparés quotidiennement sur place
                  par notre équipe de restauration, garantissant une qualité
                  nutritionnelle.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Chaque menu est conçu pour répondre aux besoins énergétiques et
                  nutritionnels des élèves, en privilégiant une alimentation
                  équilibrée et variée. Nous accordons une attention
                  particulière à la qualité des produits et au respect des
                  normes d&apos;hygiène et de sécurité alimentaire.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-semibold text-[#8C1515]">
                  Découvrez ci-dessous nos menus de la semaine.
                </p>
              </div>
              {needsShowMore && (
                <button
                  type="button"
                  onClick={toggleShowMore}
                  className="mt-4 text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1 mx-auto"
                >
                  {showMoreDescription ? "Voir moins" : "Voir plus"}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${showMoreDescription ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 px-2 sm:px-4">
            <div className="flex justify-center w-full max-w-5xl">
              <div className="relative w-full md:w-[90%] h-[65vh] sm:h-[72vh] md:h-[78vh] rounded-xl shadow-2xl overflow-auto border border-gray-200 bg-gray-100 flex items-center justify-center">
                <NextImage
                  src={IMAGE_CANTINE}
                  alt="Menu Restaurant Scolaire - Les Récollets"
                  width={1600}
                  height={900}
                  className="max-w-none h-full w-auto object-contain object-center rotate-90 select-none"
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1200px"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
            <a
              href={PDF_CANTINE}
              download="Menu-Cantine-Les-Recollets.pdf"
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#8C1515] text-white rounded-lg hover:bg-[#a01919] transition-colors font-[var(--font-inter)] font-semibold shadow-lg"
            >
              <Download size={20} />
              Télécharger le menu
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
