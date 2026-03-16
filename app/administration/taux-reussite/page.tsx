'use client';

import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useEffect, useRef } from 'react';
import NextImage from "next/image";

const ANNEES = [
  { annee: 2025, extension: 'png' },
  { annee: 2024, extension: 'jpg' },
  { annee: 2023, extension: 'png' },
  { annee: 2022, extension: 'png' },
  { annee: 2021, extension: 'png' },
  { annee: 2020, extension: 'png' },
  { annee: 2019, extension: 'png' },
  { annee: 2018, extension: 'png' },
  { annee: 2017, extension: 'png' },
];

export default function TauxReussitePage() {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [anneeSelectionnee, setAnneeSelectionnee] = useState<number | null>(2025);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const anneeActuelle = anneeSelectionnee ? ANNEES.find(a => a.annee === anneeSelectionnee) : null;

  useEffect(() => {
    const checkDescriptionHeight = () => {
      if (descriptionRef.current) {
        const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight) || 28;
        setNeedsShowMore(descriptionRef.current.scrollHeight > lineHeight * 4);
      }
    };

    const timer = setTimeout(checkDescriptionHeight, 100);
    window.addEventListener('resize', checkDescriptionHeight, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkDescriptionHeight);
    };
  }, []);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const threshold = 1;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > threshold);
    setCanScrollRight(maxScroll > 0 && scrollLeft < maxScroll - threshold);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setTimeout(checkScroll, 100);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScroll();

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    const buttonWidth = 112 + 16;
    scrollContainerRef.current.scrollBy({ left: -buttonWidth * 2, behavior: 'smooth' });
    requestAnimationFrame(checkScroll);
    setTimeout(checkScroll, 50);
    setTimeout(checkScroll, 200);
    setTimeout(checkScroll, 400);
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    const buttonWidth = 112 + 16;
    scrollContainerRef.current.scrollBy({ left: buttonWidth * 2, behavior: 'smooth' });
    requestAnimationFrame(checkScroll);
    setTimeout(checkScroll, 50);
    setTimeout(checkScroll, 200);
    setTimeout(checkScroll, 400);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/administration/taux-reussite" />

      <section className="bg-white py-8 sm:py-12 lg:py-16 pt-20 sm:pt-24 lg:pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Taux de Réussite
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8" />

            <div className="max-w-4xl mx-auto mb-12 text-center">
              <div
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? 'line-clamp-4' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  L&apos;Ensemble Scolaire Privé des Récollets se distingue par l&apos;excellence de ses résultats aux examens nationaux. Depuis de nombreuses années, nos élèves obtiennent des taux de réussite remarquables qui témoignent de la qualité de notre enseignement et de l&apos;accompagnement personnalisé que nous offrons à chaque jeune.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  Notre engagement envers l&apos;excellence académique, combiné à une pédagogie bienveillante et exigeante, permet à nos élèves de développer leur plein potentiel et de réussir brillamment leurs examens. Ces résultats exceptionnels reflètent le travail assidu de nos équipes éducatives et la confiance que nous plaçons en chaque élève.
                </p>
                <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-semibold text-[#8C1515]">
                  Découvrez ci-dessous les résultats détaillés en sélectionnant l&apos;année souhaitée.
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
                  <ChevronDown size={16} className={`transition-transform ${showMoreDescription ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Sélecteur d'année */}
          <div className="w-full max-w-[75vw] mx-auto mb-12">
            <h3 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Sélectionnez une année
            </h3>

            <div className="relative flex items-center justify-center gap-4">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'bg-[#8C1515] text-white hover:bg-[#a01919] hover:scale-110 hover:shadow-xl cursor-pointer shadow-lg active:scale-95'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-40'
                }`}
                aria-label="Défiler vers la gauche"
              >
                <ChevronLeft size={22} strokeWidth={3} className={canScrollLeft ? 'animate-arrow-left' : ''} />
              </button>

              <div className="flex-1 flex justify-center relative">
                <div
                  ref={scrollContainerRef}
                  onScroll={checkScroll}
                  className="overflow-x-auto overflow-y-visible scrollbar-hide snap-x snap-mandatory scroll-smooth relative"
                  style={{ width: '100%', maxWidth: 'min(calc(7 * (112px + 16px)), 75vw)', minHeight: '80px' }}
                >
                  <div className="flex gap-4 px-2 py-2" style={{ width: 'max-content' }}>
                    <div className="flex-shrink-0 w-16" />
                    {ANNEES.map(({ annee }) => (
                      <button
                        key={annee}
                        onClick={() => setAnneeSelectionnee(annee)}
                        className={`flex-shrink-0 w-28 px-5 py-3 rounded-xl font-[var(--font-inter)] text-lg font-bold transition-all duration-300 snap-start ${
                          anneeSelectionnee === annee
                            ? 'bg-gradient-to-br from-[#8C1515] to-[#a01919] text-white transform scale-105 ring-2 ring-[#8C1515] ring-offset-1'
                            : 'bg-white text-[#8C1515] border-2 border-[#8C1515]/60 hover:bg-[#8C1515] hover:text-white hover:shadow-lg hover:scale-105 hover:border-[#8C1515] active:scale-95'
                        }`}
                      >
                        {annee}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'bg-[#8C1515] text-white hover:bg-[#a01919] hover:scale-110 hover:shadow-xl cursor-pointer shadow-lg active:scale-95'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-40'
                }`}
                aria-label="Défiler vers la droite"
              >
                <ChevronRight size={22} strokeWidth={3} className={canScrollRight ? 'animate-arrow-right' : ''} />
              </button>
            </div>
          </div>

          {/* Affichage du résultat */}
          {anneeActuelle && (
            <div className="mb-12">
              <h3 className="font-[var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8C1515] mb-6 text-center">
                Résultats {anneeActuelle.annee}
              </h3>
              <div className="flex justify-center">
                <NextImage
                  src={`/Images/Resultat/ResultatsExamens${anneeActuelle.annee}.${anneeActuelle.extension}`}
                  alt={`Résultats des examens ${anneeActuelle.annee} - Les Récollets`}
                  width={1400}
                  height={900}
                  className="w-full max-w-6xl h-auto rounded-lg shadow-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
