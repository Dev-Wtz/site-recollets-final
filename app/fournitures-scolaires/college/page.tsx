'use client';

import { ChevronDown, ArrowLeft, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function FournitureCollegePage() {  // Liste des classes du collège
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Vérifier si navbar1 dépasse 85% de la largeur de l'écran
  useEffect(() => {
    const checkNavbarWidth = () => {
      requestAnimationFrame(() => {
        if (navRef.current) {
          void navRef.current.offsetHeight;
          const navWidth = navRef.current.offsetWidth || navRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          const percentage = (navWidth / windowWidth) * 100;
          const shouldShowHamburger = percentage > 85;
          setShowHamburgerMenu(shouldShowHamburger);
        }
      });
    };

    checkNavbarWidth();
    const timeoutId1 = setTimeout(checkNavbarWidth, 50);
    const timeoutId2 = setTimeout(checkNavbarWidth, 150);
    const timeoutId3 = setTimeout(checkNavbarWidth, 300);
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkNavbarWidth, 50);
    };
    window.addEventListener('resize', handleResize);
    
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      const checkAndObserve = () => {
        if (navRef.current) {
          resizeObserver = new ResizeObserver(() => {
            checkNavbarWidth();
          });
          resizeObserver.observe(navRef.current);
        } else {
          setTimeout(checkAndObserve, 50);
        }
      };
      checkAndObserve();
    }
    
    const intervalId = setInterval(checkNavbarWidth, 1000);
    
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      clearTimeout(resizeTimeout);
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver && navRef.current) {
        resizeObserver.unobserve(navRef.current);
      }
    };
  }, []);

  const classes = [
    { code: '6', nom: '6ème', fichier: 'Fourniture6' },
    { code: '5', nom: '5ème', fichier: 'Fourniture5' },
    { code: '4', nom: '4ème', fichier: 'Fourniture4' },
    { code: '3', nom: '3ème', fichier: 'Fourniture3' },
    { code: '3PM', nom: '3ème Prépa Métier', fichier: 'Fourniture3PM' },
  ];

  // État pour la classe sélectionnée (6ème par défaut)
  const [classeSelectionnee, setClasseSelectionnee] = useState<string>('6');

  // Référence pour le conteneur de scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // État pour le masque CSS
  const [maskImage, setMaskImage] = useState('linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)');

  // Fonction pour vérifier le scroll
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const threshold = 1;
      const maxScroll = scrollWidth - clientWidth;
      
      const newCanScrollLeft = scrollLeft > threshold;
      const newCanScrollRight = maxScroll > 0 && scrollLeft < maxScroll - threshold;
      
      setCanScrollLeft(newCanScrollLeft);
      setCanScrollRight(newCanScrollRight);
      
      // Mettre à jour le masque CSS
      const gradientWidth = '100px';
      const isAtStart = scrollLeft <= threshold;
      const isAtEnd = maxScroll > 0 && scrollLeft >= maxScroll - threshold;
      
      if (isAtStart && isAtEnd) {
        setMaskImage('none');
      } else if (isAtStart) {
        setMaskImage(`linear-gradient(to right, black 0%, black calc(100% - ${gradientWidth}), transparent 100%)`);
      } else if (isAtEnd) {
        setMaskImage(`linear-gradient(to right, transparent 0%, black ${gradientWidth}, black 100%)`);
      } else {
        setMaskImage(`linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`);
      }
    }
  };

  // Scroll initial : commencer à la position la plus à gauche
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setTimeout(() => {
        checkScroll();
      }, 100);
    }
  }, []);

  // Listener pour mettre à jour dynamiquement les indicateurs lors du scroll
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
  }, []);

  // Fonctions de scroll
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const buttonWidth = 112 + 16;
      scrollContainerRef.current.scrollBy({ left: -buttonWidth * 2, behavior: 'smooth' });
      requestAnimationFrame(checkScroll);
      setTimeout(checkScroll, 50);
      setTimeout(checkScroll, 200);
      setTimeout(checkScroll, 400);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const buttonWidth = 112 + 16;
      scrollContainerRef.current.scrollBy({ left: buttonWidth * 2, behavior: 'smooth' });
      requestAnimationFrame(checkScroll);
      setTimeout(checkScroll, 50);
      setTimeout(checkScroll, 200);
      setTimeout(checkScroll, 400);
    }
  };

  // Trouver la classe sélectionnée
  const classeActuelle = classes.find(c => c.code === classeSelectionnee);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Stanford - Structure Exacte */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Barre Supérieure - Toujours opaque sur cette page */}
        <div className="text-white transition-all duration-300 border-b border-white/10 bg-[#2e2d29]/95 backdrop-blur-md shadow-lg">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-14 relative">
              {/* Bouton retour à gauche - Toujours visible */}
              <Link 
                href="/" 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity text-sm z-10"
              >
                <ArrowLeft size={18} strokeWidth={2} />
              </Link>
              
              {/* Links centrés avec menus déroulants */}
              <div 
                ref={navRef}
                className={`flex items-center gap-2 lg:gap-7 text-xs lg:text-sm absolute left-1/2 -translate-x-1/2 ${showHamburgerMenu ? 'opacity-0 pointer-events-none -z-10' : ''}`}
              >
                {/* Structures */}
                <div className="relative group">
                  <button className="hover:underline transition-all flex items-center gap-1 cursor-pointer">
                    Structures
                    <ChevronDown size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[220px] z-50">
                    <Link href="/structures/maternelle" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors first:rounded-t-lg">Maternelle</Link>
                    <Link href="/structures/primaire" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors">Primaire</Link>
                    <Link href="/structures/college" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors">Collège</Link>
                    <Link href="/structures/lycee-general-et-technologique" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors">Lycée Général et Technologique</Link>
                    <Link href="/structures/lycee-professionnel" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors last:rounded-b-lg">Lycée Professionnel</Link>
                  </div>
                </div>

                {/* Administration */}
                <div className="relative group">
                  <button className="hover:underline transition-all flex items-center gap-1 cursor-pointer">
                    Administration
                    <ChevronDown size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[180px] z-50">
                    <Link href="/administration/tarif" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors first:rounded-t-lg">Tarif</Link>
                    <Link href="/administration/reglement" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors">Règlement</Link>
                    <Link href="/administration/taux-reussite" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors last:rounded-b-lg">Taux de réussite</Link>
                  </div>
                </div>

                {/* Restauration */}
                <div className="relative group">
                  <button className="hover:underline transition-all flex items-center gap-1 cursor-pointer">
                    Restauration
                    <ChevronDown size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[180px] z-50">
                    <Link href="/restauration/maternelle" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors first:rounded-t-lg">Maternelle</Link>
                    <Link href="/restauration/cantine" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors">Cantine</Link>
                    <Link href="/restauration/cafeteria" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors last:rounded-b-lg">Cafétéria</Link>
                  </div>
                </div>

                {/* Fournitures Scolaires */}
                <div className="relative group">
                  <button className="hover:underline transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap">
                    Fournitures Scolaires
                    
                    <ChevronDown size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[180px] z-50">
                    <Link href="/fournitures-scolaires/ecole" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors first:rounded-t-lg">École</Link>
                    <Link href="/fournitures-scolaires/college" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors bg-[#8C1515] text-white">Collège</Link>
                    <Link href="/fournitures-scolaires/lycee-pro" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors last:rounded-b-lg">Lycée Pro</Link>
                  </div>
                </div>

                {/* Sport */}
                <div className="relative group">
                  <button className="hover:underline transition-all flex items-center gap-1 cursor-pointer">
                    Sport
                    <ChevronDown size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[180px] z-50">
                    <Link href="/sport/calendrier-sportif" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors first:rounded-t-lg">Calendrier sportif</Link>
                    <Link href="/sport/resultats-sportifs" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors">Résultats sportifs</Link>
                    <Link href="/sport/inscription-unss" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors last:rounded-b-lg">Inscription UNSS</Link>
                  </div>
                </div>

                {/* Activités */}
                <div className="relative group">
                  <button className="hover:underline transition-all flex items-center gap-1 cursor-pointer">
                    Activités
                    <ChevronDown size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[180px] z-50">
                    <Link href="/activites/animation" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors first:rounded-t-lg">Animation</Link>
                    <Link href="/activites/sorties-scolaires" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors">Sorties scolaires</Link>
                    <Link href="/activites/les-choucas" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors last:rounded-b-lg">Les Choucas</Link>
                  </div>
                </div>
              </div>
            
              {/* Bouton hamburger - affiché quand showHamburgerMenu est true */}
              {showHamburgerMenu && (
                <div className="absolute right-0">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white hover:text-gray-200 transition-colors p-2"
                    aria-label="Menu"
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu hamburger mobile */}
        {showHamburgerMenu && isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white text-gray-800 shadow-xl z-50 max-h-[80vh] overflow-y-auto">
            <div className="max-w-[1400px] mx-auto px-4 py-4">
              {/* Structures */}
              <div className="mb-2">
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === 'structures' ? null : 'structures')}
                  className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-semibold">Structures</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${openSubmenu === 'structures' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSubmenu === 'structures' && (
                  <div className="ml-4 border-l-2 border-[#8C1515] pl-4 mt-2">
                    <Link href="/structures/maternelle" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Maternelle</Link>
                    <Link href="/structures/primaire" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Primaire</Link>
                    <Link href="/structures/college" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Collège</Link>
                    <Link href="/structures/lycee-general-et-technologique" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Lycée Général et Technologique</Link>
                    <Link href="/structures/lycee-professionnel" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Lycée Professionnel</Link>
                  </div>
                )}
              </div>

              {/* Administration */}
              <div className="mb-2">
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === 'administration' ? null : 'administration')}
                  className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-semibold">Administration</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${openSubmenu === 'administration' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSubmenu === 'administration' && (
                  <div className="ml-4 border-l-2 border-[#8C1515] pl-4 mt-2">
                    <Link href="/administration/tarif" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Tarif</Link>
                    <Link href="/administration/reglement" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Règlement</Link>
                    <Link href="/administration/taux-reussite" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Taux de réussite</Link>
                  </div>
                )}
              </div>

              {/* Restauration */}
              <div className="mb-2">
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === 'restauration' ? null : 'restauration')}
                  className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-semibold">Restauration</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${openSubmenu === 'restauration' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSubmenu === 'restauration' && (
                  <div className="ml-4 border-l-2 border-[#8C1515] pl-4 mt-2">
                    <Link href="/restauration/maternelle" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Maternelle</Link>
                    <Link href="/restauration/cantine" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Cantine</Link>
                    <Link href="/restauration/cafeteria" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Cafétéria</Link>
                  </div>
                )}
              </div>

              {/* Fournitures Scolaires */}
              <div className="mb-2">
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === 'fournitures' ? null : 'fournitures')}
                  className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-semibold">Fournitures Scolaires</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${openSubmenu === 'fournitures' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSubmenu === 'fournitures' && (
                  <div className="ml-4 border-l-2 border-[#8C1515] pl-4 mt-2">
                    <Link href="/fournitures-scolaires/ecole" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">École</Link>
                    <Link href="/fournitures-scolaires/college" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Collège</Link>
                    <Link href="/fournitures-scolaires/lycee-pro" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Lycée Pro</Link>
                  </div>
                )}
              </div>

              {/* Sport */}
              <div className="mb-2">
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === 'sport' ? null : 'sport')}
                  className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-semibold">Sport</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${openSubmenu === 'sport' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSubmenu === 'sport' && (
                  <div className="ml-4 border-l-2 border-[#8C1515] pl-4 mt-2">
                    <Link href="/sport/calendrier-sportif" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Calendrier sportif</Link>
                    <Link href="/sport/resultats-sportifs" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Résultats sportifs</Link>
                    <Link href="/sport/inscription-unss" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Inscription UNSS</Link>
                  </div>
                )}
              </div>

              {/* Activités */}
              <div className="mb-2">
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === 'activites' ? null : 'activites')}
                  className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-semibold">Activités</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${openSubmenu === 'activites' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSubmenu === 'activites' && (
                  <div className="ml-4 border-l-2 border-[#8C1515] pl-4 mt-2">
                    <Link href="/activites/animation" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Animation</Link>
                    <Link href="/activites/sorties-scolaires" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Sorties scolaires</Link>
                    <Link href="/activites/les-choucas" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors">Les Choucas</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Section Fournitures Scolaires Collège avec animation de fondu */}
      <section className="bg-white py-16 pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-12">
            <h2 className="font-[var(--font-playfair)] text-5xl lg:text-6xl font-bold text-[#8C1515] mb-6 text-center">
              Fournitures Scolaires - Collège
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>
            
            {/* Texte descriptif */}
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                Retrouvez ci-dessous la liste des fournitures scolaires nécessaires pour chaque niveau du collège. Ces listes vous permettront de préparer la rentrée scolaire dans les meilleures conditions.
              </p>
              <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed font-semibold text-[#8C1515]">
                Sélectionnez la classe de votre enfant pour consulter la liste complète des fournitures.
              </p>
            </div>
          </div>

          {/* Sélecteur de classe - Défilement horizontal avec 7 boutons visibles */}
          <div className="w-full max-w-[75vw] mx-auto mb-12">
            <h3 className="font-[var(--font-playfair)] text-2xl lg:text-3xl font-bold text-[#8C1515] mb-6 text-center">
              Sélectionnez une classe
            </h3>
            
            {/* Conteneur avec défilement horizontal - Affiche 7 boutons à la fois */}
            <div className="relative flex items-center justify-center gap-4">
              {/* Flèche gauche */}
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'bg-[#8C1515] text-white hover:bg-[#a01919] hover:scale-110 hover:shadow-xl cursor-pointer shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-40'
                }`}
                aria-label="Défiler vers la gauche"
              >
                <ChevronLeft 
                  size={22} 
                  strokeWidth={3} 
                  className={canScrollLeft ? 'animate-arrow-left' : ''}
                />
              </button>

              {/* Conteneur de scroll centré avec dégradés */}
              <div className="flex-1 flex justify-center relative">
                <div 
                  ref={scrollContainerRef}
                  onScroll={checkScroll}
                  className="overflow-x-auto overflow-y-visible scrollbar-hide snap-x snap-mandatory scroll-smooth relative"
                  style={{ 
                    width: '100%',
                    maxWidth: 'min(calc(1.3 * (112px + 16px)), 75vw)', // Affiche ~1.3 bouton (premier complet + 1/3 du suivant)
                    minHeight: '80px',
                    maskImage: maskImage,
                    WebkitMaskImage: maskImage
                  }}
                >
                  <div className="flex gap-4 px-2 py-2" style={{ width: 'max-content' }}>
                    {/* Espace à gauche pour permettre le scroll complet */}
                    <div className="flex-shrink-0 w-16"></div>
              {classes.map((classe) => (
                <button
                  key={classe.code}
                  onClick={() => setClasseSelectionnee(classe.code)}
                        className={`flex-shrink-0 w-28 px-5 py-3 rounded-xl font-[var(--font-inter)] text-lg font-bold transition-all duration-300 snap-start focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-1 ${
                    classeSelectionnee === classe.code
                      ? 'bg-gradient-to-br from-[#8C1515] to-[#a01919] text-white transform scale-105 ring-2 ring-[#8C1515] ring-offset-1'
                      : 'bg-white text-[#8C1515] border-2 border-[#8C1515]/60 hover:bg-[#8C1515] hover:text-white hover:shadow-lg hover:scale-105 hover:border-[#8C1515] active:scale-95'
                  }`}
                >
                        <div className="font-bold">{classe.code}</div>
                  <div className="text-xs mt-1 opacity-90">{classe.nom}</div>
                </button>
              ))}
                  </div>
                </div>
              </div>

              {/* Flèche droite */}
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'bg-[#8C1515] text-white hover:bg-[#a01919] hover:scale-110 hover:shadow-xl cursor-pointer shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-40'
                }`}
                aria-label="Défiler vers la droite"
              >
                <ChevronRight 
                  size={22} 
                  strokeWidth={3} 
                  className={canScrollRight ? 'animate-arrow-right' : ''}
                />
              </button>
            </div>
          </div>

          {/* Affichage du PDF de la classe sélectionnée */}
          {classeActuelle && (
            <div className="mb-12 animate-fade-in">
              <h3 className="font-[var(--font-playfair)] text-3xl lg:text-4xl font-bold text-[#8C1515] mb-6 text-center">
                Fournitures {classeActuelle.nom}
              </h3>
              <div className="flex justify-center">
                <embed
                  src={`/${classeActuelle.fichier}.pdf`}
                  type="application/pdf"
                  className="w-full max-w-6xl h-[800px] rounded-lg shadow-2xl border-2 border-gray-200"
                  title={`Fournitures ${classeActuelle.nom}`}
                />
              </div>
              <div className="text-center mt-4">
                <a
                  href={`/${classeActuelle.fichier}.pdf`}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8C1515] text-white rounded-lg hover:bg-[#a01919] transition-colors font-[var(--font-inter)] font-semibold"
                >
                  Télécharger le PDF
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer - Blanc avec Dégradé Sombre sur Tout */}
      <footer className="bg-gradient-to-b from-white via-gray-50 via-gray-100 to-gray-300 border-t-4 border-[#8C1515]">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Colonne 1: Adresse */}
            <div>
              <h3 className="font-[var(--font-inter)] text-xs font-bold mb-1.5 uppercase tracking-wide text-[#8C1515]">
                Adresse
              </h3>
              <p className="font-[var(--font-inter)] text-xs text-gray-700 leading-snug">
                44 rue du Général Pershing<br />
                54400 LONGWY
              </p>
            </div>

            {/* Colonne 2: Horaires */}
            <div>
              <h3 className="font-[var(--font-inter)] text-xs font-bold mb-1.5 uppercase tracking-wide text-[#8C1515]">
                Horaires d'Ouverture
              </h3>
              <div className="font-[var(--font-inter)] text-xs text-gray-700 space-y-0.5">
                <p>Lundi au Vendredi : 8h – 12h et 13h – 17h</p>
                <p>Mercredi : 8h – 12h</p>
                <p>Samedi, Dimanche et Jours Fériés : Fermé</p>
              </div>
            </div>

            {/* Colonne 3: Contact */}
            <div>
              <h3 className="font-[var(--font-inter)] text-xs font-bold mb-1.5 uppercase tracking-wide text-[#8C1515]">
                Contact
              </h3>
              <div className="font-[var(--font-inter)] text-xs text-gray-700 space-y-0.5">
                <p>
                  <span className="text-gray-500">Tél :</span>{' '}
                  <a href="tel:0382259920" className="hover:text-[#8C1515] transition-colors">
                    03 82 25 99 20
                  </a>
                </p>
                <p>
                  <span className="text-gray-500">Mail :</span>{' '}
                  <a href="mailto:accueil.ensemblescolaire@lesrecollets.org" className="hover:text-[#8C1515] transition-colors break-all">
                    accueil.ensemblescolaire@lesrecollets.org
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 py-2">
          <p className="text-center font-[var(--font-inter)] text-xs text-gray-600">
            © {new Date().getFullYear()} Les Récollets - Ensemble Scolaire Privé. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

