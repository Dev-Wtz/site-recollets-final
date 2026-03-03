"use client";

import { ChevronDown, Download } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import NextImage from "next/image";
import { useShowMoreText } from "@/app/hooks/useShowMoreText";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/app/lib/constants";

const PDF_CAFETERIA = "/Menu_Cafeteriat.pdf";
const IMAGE_CAFETERIA = "/Menu_Cafeteriat.webp.webp";

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
                  Decouvrez ci-dessous nos menus de la semaine.
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
            <div className="flex justify-center w-full max-w-4xl">
              <div className="relative w-full md:w-[90%] aspect-[9/16] max-h-[85vh] rounded-xl shadow-2xl overflow-hidden border border-gray-200 bg-gray-100">
                <NextImage
                  src={IMAGE_CAFETERIA}
                  alt="Menu Cafeteria du Lycee - Les Recollets"
                  width={900}
                  height={1600}
                  className="w-full h-full object-cover object-center select-none"
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 800px"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
            <a
              href={PDF_CAFETERIA}
              download="Menu-Cafeteria-Les-Recollets.pdf"
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#8C1515] text-white rounded-lg hover:bg-[#a01919] transition-colors font-[var(--font-inter)] font-semibold shadow-lg"
            >
              <Download size={20} />
              Telecharger le menu
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

