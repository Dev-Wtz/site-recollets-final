'use client';

import { ChevronDown, Utensils } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import MenuImageWithLightbox from "@/app/components/MenuImageWithLightbox";

import { useEffect, useState, useRef } from 'react';

const MENU_MATERNELLE = '/Images/Menus/Menu_Maternelle.jpg';

export default function MaternellePage() {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Vérifier si la description fait plus de 8 lignes
  useEffect(() => {
    const checkDescriptionHeight = () => {
      if (descriptionRef.current) {
        const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight) || 28;
        const maxHeight = lineHeight * 8;
        const actualHeight = descriptionRef.current.scrollHeight;
        setNeedsShowMore(actualHeight > maxHeight);
      }
    };

    const timer = setTimeout(checkDescriptionHeight, 100);
    window.addEventListener('resize', checkDescriptionHeight, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkDescriptionHeight);
    };
  }, []);

  // Fonction optimisée pour télécharger le menu
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar activePage="/restauration/maternelle" />

      {/* Section principale */}
      <section className="bg-white py-8 sm:py-12 lg:py-16 pt-20 sm:pt-24 lg:pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Menu Restauration Maternelle
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8" aria-hidden="true"></div>
            
            {/* Description */}
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <div 
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  La restauration maternelle des Récollets s&apos;engage à offrir une alimentation de qualité, équilibrée et adaptée aux besoins nutritionnels des plus jeunes. Nos repas sont préparés avec soin.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Chaque menu est élaboré par notre équipe de restauration en collaboration avec l&apos;équipe Gourmandises Et Passions, garantissant des repas variés, savoureux et respectueux des besoins spécifiques des enfants en maternelle.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-semibold text-[#8C1515]">
                  La cantine maternelle est fermée pour la fin de l&apos;année scolaire.
                </p>
              </div>
              {needsShowMore && (
                <button
                  type="button"
                  onClick={() => setShowMoreDescription(!showMoreDescription)}
                  className="mt-4 text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1 mx-auto"
                  aria-expanded={showMoreDescription}
                >
                  {showMoreDescription ? 'Voir moins' : 'Voir plus'}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${showMoreDescription ? 'rotate-180' : ''}`}
                    aria-hidden="true"
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
              Cantine Maternelle Fermée
            </h3>
            <p className="font-[var(--font-inter)] text-sm sm:text-base text-gray-700 leading-relaxed">
              La cantine maternelle est fermée pour la fin de l&apos;année scolaire. Nous aurons le plaisir de vous retrouver à la rentrée.
            </p>
          </div>
      </section>

      <Footer />
    </div>
  );
}
