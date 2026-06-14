"use client";

import { ChevronDown, Coffee } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useShowMoreText } from "@/app/hooks/useShowMoreText";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/app/lib/constants";

export default function CafeteriaPage() {
  const {
    ref: descriptionRef,
    expanded: showMoreDescription,
    needsShowMore,
    toggle: toggleShowMore,
  } = useShowMoreText(8);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/restauration/cafeteria" />

      <section className={`bg-white ${SECTION_PADDING} animate-fade-in`}>
        <div className={CONTAINER_CLASS}>
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Menu Cafeteria du Lycee
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>

            <div className="max-w-3xl mx-auto mb-12 text-center">
              <div
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? "line-clamp-[5]" : ""}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  La cafeteria des Recollets offre un espace convivial ou les eleves peuvent se restaurer avec des
                  produits de qualite. Nous proposons une selection variee de plats chauds, salades, sandwiches et
                  desserts.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Notre equipe de restauration veille a proposer des options equilibrees et savoureuses. La cafeteria
                  est un lieu de convivialite ou les eleves peuvent se retrouver autour d&apos;un repas de qualite.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-semibold text-[#8C1515]">
                  La cafétéria est fermée pour la fin de l&apos;année scolaire.
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

          <div className="max-w-md mx-auto p-8 rounded-2xl bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F0] border border-[#FAD2D2] shadow-md flex flex-col items-center text-center gap-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#8C1515] border border-[#FCA5A5] mb-2">
              <Coffee size={32} className="animate-pulse" />
            </div>
            <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515]">
              Cafeteriat Fermée
            </h3>
            <p className="font-[var(--font-inter)] text-sm sm:text-base text-gray-700 leading-relaxed">
              La cafétéria est fermée pour la fin de l&apos;année scolaire. Nous aurons le plaisir de vous retrouver à la rentrée.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

