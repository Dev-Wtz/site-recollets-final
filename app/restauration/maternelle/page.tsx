'use client';

import { ChevronDown, Download } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import NextImage from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';

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
  const handleDownloadMenu = useCallback(() => {
    try {
      const link = document.createElement('a');
      link.href = '/MenuMaternelle.png';
      link.download = 'Menu-Maternelle-Les-Recollets.png';
      link.setAttribute('rel', 'noopener noreferrer');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur lors du téléchargement du menu:', error);
    }
  }, []);

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
                  Découvrez ci-dessous nos menus de la semaine.
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

          {/* Image du menu avec bouton de téléchargement */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center w-full">
              <div className="relative w-full max-w-6xl">
                <NextImage
                  src="/MenuMaternelle.png"
                  alt="Menu Maternelle - Les Récollets"
                  width={1200}
                  height={1600}
                  className="w-full h-auto rounded-lg shadow-2xl"
                  loading="lazy"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority={false}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadMenu}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#8C1515] text-white rounded-lg hover:bg-[#a01919] transition-colors font-[var(--font-inter)] font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2"
              aria-label="Télécharger le menu maternelle"
            >
              <Download size={20} aria-hidden="true" />
              Télécharger le menu
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
