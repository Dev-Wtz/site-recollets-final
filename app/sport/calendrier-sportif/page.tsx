'use client';

import { ChevronDown } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useEffect, useState, useRef } from 'react';

export default function CalendrierSportifPage() {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Vérifier si la description fait plus de 8 lignes
  useEffect(() => {
    const checkDescriptionHeight = () => {
      if (descriptionRef.current) {
        const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight) || 28;
        const maxHeight = lineHeight * 8; // 8 lignes
        const actualHeight = descriptionRef.current.scrollHeight;
        setNeedsShowMore(actualHeight > maxHeight);
      }
    };

    const timer = setTimeout(checkDescriptionHeight, 100);
    window.addEventListener('resize', checkDescriptionHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkDescriptionHeight);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/sport/calendrier-sportif" />

      {/* Section Calendrier Sportif avec animation de fondu */}
      <section className="bg-white py-8 sm:py-12 lg:py-16 pt-20 sm:pt-24 lg:pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Calendrier Sportif
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>
            
            {/* Texte descriptif */}
            <div className="max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-center">
              <div 
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Retrouvez ci-dessous les calendriers sportifs UNSS pour le collège et le lycée. Ces calendriers vous permettront de suivre toutes les compétitions et événements sportifs de l'année scolaire.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  Les activités sportives sont un élément essentiel de la formation des élèves, favorisant le développement physique, l'esprit d'équipe et les valeurs de respect et de dépassement de soi.
                </p>
              </div>
              {needsShowMore && (
                <button
                  onClick={() => setShowMoreDescription(!showMoreDescription)}
                  className="mt-4 text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1 mx-auto"
                >
                  {showMoreDescription ? 'Voir moins' : 'Voir plus'}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${showMoreDescription ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Images des calendriers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Calendrier Collège */}
            <div className="flex flex-col items-center">
              <h3 className="font-[var(--font-playfair)] text-xl sm:text-2xl lg:text-3xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
                Calendrier UNSS - Collège
              </h3>
              <img
                src="/CalendrierUnssCollege.png"
                alt="Calendrier UNSS Collège - Les Récollets"
                className="w-full max-w-2xl h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Calendrier Lycée */}
            <div className="flex flex-col items-center">
              <h3 className="font-[var(--font-playfair)] text-xl sm:text-2xl lg:text-3xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
                Calendrier UNSS - Lycée
              </h3>
              <img
                src="/CalendrierUnssLycee.png"
                alt="Calendrier UNSS Lycée - Les Récollets"
                className="w-full max-w-2xl h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
