'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useEffect, useRef, useCallback } from 'react';

/* ────────────────────────────────────────────
   Données
   ──────────────────────────────────────────── */

interface Classe {
  code: string;
  nom: string;
  fichier: string;
}

interface Volet {
  key: string;
  label: string;
  classes: Classe[];
}

const VOLETS: Volet[] = [
  {
    key: 'ecole', label: 'École',
    classes: [
      { code: 'PS', nom: 'Petite Section', fichier: 'FourniturePS ' },
      { code: 'MS', nom: 'Moyenne Section', fichier: 'FournitureMS' },
      { code: 'GS', nom: 'Grande Section', fichier: 'FournitureGS' },
      { code: 'CP', nom: 'CP', fichier: 'FournitureCP' },
      { code: 'CE1', nom: 'CE1', fichier: 'FournitureCE1' },
      { code: 'CE2', nom: 'CE2', fichier: 'FournitureCE2' },
      { code: 'CM1', nom: 'CM1', fichier: 'FournitureCM1' },
      { code: 'CM2', nom: 'CM2', fichier: 'FournitureCM2' },
    ],
  },
  {
    key: 'college', label: 'Collège',
    classes: [
      { code: '6', nom: '6ème', fichier: 'Fourniture6' },
      { code: '5', nom: '5ème', fichier: 'Fourniture5' },
      { code: '4', nom: '4ème', fichier: 'Fourniture4' },
      { code: '3', nom: '3ème', fichier: 'Fourniture3' },
      { code: '3PM', nom: '3ème Prépa Métier', fichier: 'Fourniture3PM' },
    ],
  },
  {
    key: 'lycee-pro', label: 'Lycée Pro',
    classes: [
      { code: 'SP', nom: 'Seconde Pro', fichier: 'FournitureSP' },
      { code: 'PP', nom: 'Première Pro', fichier: 'FourniturePP' },
      { code: 'TP', nom: 'Terminale Pro', fichier: 'FournitureTP' },
    ],
  },
];

/* ────────────────────────────────────────────
   Composant
   ──────────────────────────────────────────── */

export default function FournituresScolairesPage() {
  const [voletActif, setVoletActif] = useState('ecole');
  const [classeSelectionnee, setClasseSelectionnee] = useState('PS');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [version, setVersion] = useState('');

  useEffect(() => {
    setVersion(Date.now().toString());
  }, []);

  const volet = VOLETS.find((v) => v.key === voletActif)!;
  const classeActuelle = volet.classes.find((c) => c.code === classeSelectionnee);

  // Quand on change de volet, sélectionner la 1ère classe
  const changerVolet = useCallback((key: string) => {
    setVoletActif(key);
    const v = VOLETS.find((v) => v.key === key)!;
    setClasseSelectionnee(v.classes[0].code);
  }, []);

  // --- Scroll ---
  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const threshold = 1;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > threshold);
    setCanScrollRight(maxScroll > 0 && scrollLeft < maxScroll - threshold);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setTimeout(checkScroll, 100);
    }
  }, [voletActif, checkScroll]);

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
    window.addEventListener('resize', checkScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [voletActif, checkScroll]);

  const scrollLeftFn = () => {
    if (scrollContainerRef.current) {
      const buttonWidth = 112 + 16;
      scrollContainerRef.current.scrollBy({ left: -buttonWidth * 2, behavior: 'smooth' });
      requestAnimationFrame(checkScroll);
      setTimeout(checkScroll, 50);
      setTimeout(checkScroll, 200);
      setTimeout(checkScroll, 400);
    }
  };

  const scrollRightFn = () => {
    if (scrollContainerRef.current) {
      const buttonWidth = 112 + 16;
      scrollContainerRef.current.scrollBy({ left: buttonWidth * 2, behavior: 'smooth' });
      requestAnimationFrame(checkScroll);
      setTimeout(checkScroll, 50);
      setTimeout(checkScroll, 200);
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="/administration/fournitures-scolaires" />

      <section className="bg-white py-8 sm:py-12 lg:py-16 pt-20 sm:pt-24 lg:pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Fournitures Scolaires
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8" />

            <div className="max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-center">
              <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                Retrouvez ci-dessous la liste des fournitures scolaires nécessaires pour chaque niveau. Ces listes vous permettront de préparer la rentrée scolaire dans les meilleures conditions.
              </p>
              <p className="font-[var(--font-inter)] text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-semibold text-[#8C1515]">
                Sélectionnez le niveau puis la classe de votre enfant.
              </p>
            </div>
          </div>

          {/* ═══════ Sélecteur de volet : École / Collège / Lycée Pro ═══════ */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="inline-flex rounded-xl overflow-hidden border-2 border-[#8C1515]">
              {VOLETS.map((v) => (
                <button
                  key={v.key}
                  onClick={() => changerVolet(v.key)}
                  className={`px-5 sm:px-8 py-3 sm:py-4 font-[var(--font-inter)] text-sm sm:text-base font-bold transition-all duration-200 ${
                    voletActif === v.key
                      ? 'bg-[#8C1515] text-white'
                      : 'bg-white text-[#8C1515] hover:bg-[#8C1515]/10'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* ═══════ Sélecteur de classe (défilement horizontal) ═══════ */}
          <div className="w-full max-w-[95vw] sm:max-w-[85vw] lg:max-w-[75vw] mx-auto mb-8 sm:mb-10 lg:mb-12">
            <h3 className="font-[var(--font-playfair)] text-xl sm:text-2xl lg:text-3xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
              Sélectionnez une classe
            </h3>

            <div className="relative flex items-center justify-center gap-4">
              {/* Flèche gauche */}
              <button
                onClick={scrollLeftFn}
                disabled={!canScrollLeft}
                className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'bg-[#8C1515] text-white hover:bg-[#a01919] hover:scale-110 hover:shadow-xl cursor-pointer shadow-lg active:scale-95'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-40'
                }`}
                aria-label="Défiler vers la gauche"
              >
                <ChevronLeft size={22} strokeWidth={3} className={canScrollLeft ? 'animate-arrow-left' : ''} />
              </button>

              {/* Conteneur de scroll */}
              <div className="flex-1 flex justify-center relative">
                <div
                  ref={scrollContainerRef}
                  onScroll={checkScroll}
                  className="overflow-x-auto overflow-y-visible scrollbar-hide snap-x snap-mandatory scroll-smooth relative"
                  style={{ width: '100%', maxWidth: 'min(calc(7 * (112px + 16px)), 75vw)', minHeight: '80px' }}
                >
                  <div className="flex gap-4 px-2 py-2" style={{ width: 'max-content' }}>
                    <div className="flex-shrink-0 w-16" />
                    {volet.classes.map((classe) => (
                      <button
                        key={classe.code}
                        onClick={() => setClasseSelectionnee(classe.code)}
                        className={`flex-shrink-0 w-20 sm:w-24 lg:w-28 px-4 py-3 rounded-xl font-[var(--font-inter)] text-sm sm:text-base lg:text-lg font-bold transition-all duration-300 snap-start flex flex-col items-center justify-center text-center ${
                          classeSelectionnee === classe.code
                            ? 'bg-gradient-to-br from-[#8C1515] to-[#a01919] text-white transform scale-105 ring-2 ring-[#8C1515] ring-offset-1'
                            : 'bg-white text-[#8C1515] border-2 border-[#8C1515]/60 hover:bg-[#8C1515] hover:text-white hover:shadow-lg hover:scale-105 hover:border-[#8C1515] active:scale-95'
                        }`}
                      >
                        <div className="font-bold">{classe.code}</div>
                        <div className="text-xs mt-1 opacity-90 leading-tight">{classe.nom}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flèche droite */}
              <button
                onClick={scrollRightFn}
                disabled={!canScrollRight}
                className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
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

          {/* ═══════ Affichage du PDF ═══════ */}
          {classeActuelle && (
            <div className="mb-8 sm:mb-10 lg:mb-12 animate-fade-in" key={classeActuelle.fichier}>
              <h3 className="font-[var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8C1515] mb-4 sm:mb-6 text-center">
                Fournitures {classeActuelle.nom}
              </h3>
              <div className="flex justify-center">
                <iframe
                  src={`/Images/fournitures/${classeActuelle.fichier}.pdf?v=${version}#view=FitH&toolbar=1&navpanes=0&scrollbar=1`}
                  className="w-full max-w-6xl aspect-[210/297] max-h-[85vh] rounded-lg shadow-2xl border-2 border-gray-200"
                  title={`Fournitures ${classeActuelle.nom}`}
                />
              </div>
              <div className="text-center mt-4">
                <a
                  href={`/Images/fournitures/${classeActuelle.fichier}.pdf?v=${version}`}
                  download={`${classeActuelle.fichier}.pdf`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8C1515] text-white rounded-lg hover:bg-[#a01919] transition-colors font-[var(--font-inter)] font-semibold"
                >
                  Télécharger le PDF
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
