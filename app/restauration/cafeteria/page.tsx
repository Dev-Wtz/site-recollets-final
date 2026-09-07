"use client";

import { ChevronDown } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import MenuImageWithLightbox from "@/app/components/MenuImageWithLightbox";
import { useShowMoreText } from "@/app/hooks/useShowMoreText";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/app/lib/constants";

const MENU_CAFETERIA = "/menus/cafeteria.jpg";

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
              Menu Cafétéria du Lycée
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>

            <div className="max-w-3xl mx-auto mb-8 text-center">
              <div
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? "line-clamp-[5]" : ""}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  La cafétéria des Récollets offre un espace convivial où les élèves peuvent se restaurer avec des
                  produits de qualité. Nous proposons une sélection variée de plats chauds, salades, sandwiches et
                  desserts.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Notre équipe de restauration veille à proposer des options équilibrées et savoureuses. La cafétéria
                  est un lieu de convivialité où les élèves peuvent se retrouver autour d&apos;un repas de qualité.
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

            {/* Menu Image Component */}
            <MenuImageWithLightbox
              src={MENU_CAFETERIA}
              alt="Menu Cafétéria du Lycée de la semaine"
              title="Menu Cafétéria du Lycée"
              downloadName="menu-cafeteria.jpg"
              orientation="portrait"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


