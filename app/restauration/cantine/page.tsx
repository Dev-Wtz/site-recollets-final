"use client";

import { ChevronDown, Utensils } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import MenuImageWithLightbox from "@/app/components/MenuImageWithLightbox";
import { useShowMoreText } from "@/app/hooks/useShowMoreText";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/app/lib/constants";

const MENU_CANTINE = "/Images/Menus/Menu_Cantine.jpg";

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
                  Le restaurant scolaire est fermé pour la fin de l&apos;année scolaire.
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

        </div>

          <div className="max-w-md mx-auto p-8 rounded-2xl bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F0] border border-[#FAD2D2] shadow-md flex flex-col items-center text-center gap-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#8C1515] border border-[#FCA5A5] mb-2">
              <Utensils size={32} className="animate-pulse" />
            </div>
            <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515]">
              Restaurant Scolaire Fermé
            </h3>
            <p className="font-[var(--font-inter)] text-sm sm:text-base text-gray-700 leading-relaxed">
              Le restaurant scolaire est fermé pour la fin de l&apos;année scolaire. Nous aurons le plaisir de vous retrouver à la rentrée.
            </p>
          </div>
      </section>

      <Footer />
    </div>
  );
}
