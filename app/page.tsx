'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StructuredData from './components/StructuredData';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [reussite, setReussite] = useState(0);
  const [eleves, setEleves] = useState(0);
  const [annee, setAnnee] = useState(0);
  // Ces états sont utilisés dans les animations de chiffres
  const [titleFontSize, setTitleFontSize] = useState('9vw');
  const [subtitleFontSize, setSubtitleFontSize] = useState('1.125vw');
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<HTMLDivElement>(null);
  const [showMoreWelcome, setShowMoreWelcome] = useState(false);
  const [needsShowMoreWelcome, setNeedsShowMoreWelcome] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vérifier si navbar1 dépasse 85% de la largeur de l'écran - Optimisé pour réduire les forced reflows
  useEffect(() => {
    const checkNavbarWidth = () => {
      if (!navRef.current) return;
      
      // Utiliser requestIdleCallback pour ne pas bloquer le rendu
      const doCheck = () => {
        requestAnimationFrame(() => {
          if (navRef.current) {
            // Batch toutes les lectures géométriques ensemble
            const navWidth = navRef.current.offsetWidth || navRef.current.scrollWidth;
            const windowWidth = window.innerWidth;
            setShowHamburgerMenu((navWidth / windowWidth) * 100 > 85);
          }
        });
      };
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(doCheck, { timeout: 300 });
      } else {
        requestAnimationFrame(doCheck);
      }
    };

    // Utiliser ResizeObserver pour une détection efficace
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && navRef.current) {
      resizeObserver = new ResizeObserver(() => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(checkNavbarWidth, { timeout: 300 });
        } else {
          requestAnimationFrame(checkNavbarWidth);
        }
      });
      resizeObserver.observe(navRef.current);
    }
    
    // Vérifier initialement après un délai plus long
    const initialTimeout = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(checkNavbarWidth, { timeout: 500 });
      } else {
        requestAnimationFrame(checkNavbarWidth);
      }
    }, 200);
    
    // Vérifier à chaque resize avec debounce plus long
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(checkNavbarWidth, { timeout: 300 });
        } else {
          requestAnimationFrame(checkNavbarWidth);
        }
      }, 200);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      const currentNavRef = navRef.current;
      if (resizeObserver && currentNavRef) {
        resizeObserver.unobserve(currentNavRef);
      }
    };
  }, []);  

  // Ajuster la taille de police pour que le texte occupe 75% de la largeur de l'écran (desktop) ou 90% en mobile - Optimisé
  useEffect(() => {
    const adjustFontSize = () => {
      if (!titleRef.current || !subtitleRef.current) return;
      
      // Utiliser requestIdleCallback avec un délai plus long pour ne pas bloquer le rendu initial
      const doAdjust = () => {
        // Utiliser requestAnimationFrame pour batch toutes les lectures/écritures
        requestAnimationFrame(() => {
          const windowWidth = window.innerWidth;
          const isMobile = windowWidth < 768;
          const targetWidth = isMobile ? windowWidth * 0.90 : windowWidth * 0.75; // 90% en mobile, 75% en desktop
          
          const titleElement = titleRef.current;
          const subtitleElement = subtitleRef.current;
          if (!titleElement || !subtitleElement) return;
          
          // Obtenir la police réelle depuis le computed style
          const titleComputedStyle = window.getComputedStyle(titleElement);
          const titleFontFamily = titleComputedStyle.fontFamily || 'Playfair Display, serif';
          
          // En mobile, on mesure "Récollets" seul pour qu'il fasse 90% de la largeur
          const textToMeasure = isMobile ? 'Récollets' : 'Les Récollets';
          
          const measureElement = document.createElement('span');
          measureElement.style.cssText = 'position:absolute;top:-9999px;left:-9999px;visibility:hidden;white-space:nowrap;font-family:' + titleFontFamily + ';font-weight:bold;letter-spacing:-0.02em';
          measureElement.textContent = textToMeasure;
          document.body.appendChild(measureElement);
          
          // Estimation initiale plus précise pour réduire les itérations
          let titleSize = (targetWidth / 8.5);
          let iterations = 0;
          const maxIterations = 20; // Réduit de 100 à 20
          const tolerance = 2; // Augmenté de 0.5 à 2px pour réduire les itérations
          
          measureElement.style.fontSize = `${titleSize}px`;
          
          // Batch toutes les lectures dans requestAnimationFrame
          while (iterations < maxIterations) {
            const currentWidth = measureElement.getBoundingClientRect().width;
            const difference = Math.abs(currentWidth - targetWidth);
            
            if (difference <= tolerance) break;
            
            const ratio = targetWidth / currentWidth;
            titleSize = titleSize * ratio;
            measureElement.style.fontSize = `${titleSize}px`;
            iterations++;
          }
          
          document.body.removeChild(measureElement);
          
          // Appliquer en une seule fois
          titleElement.style.fontSize = `${titleSize}px`;
          setTitleFontSize(`${titleSize}px`);
          
          // Sous-titre avec approche simplifiée - 90% en mobile, 75% en desktop
          const subtitleTargetWidth = isMobile ? windowWidth * 0.90 : windowWidth * 0.75;
          let subtitleSize = titleSize * 0.12;
          
          const subtitleComputedStyle = window.getComputedStyle(subtitleElement);
          const subtitleFontFamily = subtitleComputedStyle.fontFamily || 'Inter, sans-serif';
          
          const measureSubtitle = document.createElement('span');
          measureSubtitle.style.cssText = 'position:absolute;top:-9999px;left:-9999px;visibility:hidden;white-space:nowrap;font-family:' + subtitleFontFamily + ';font-weight:900;letter-spacing:0.35em';
          measureSubtitle.textContent = 'Ensemble Scolaire Privé - Longwy';
          document.body.appendChild(measureSubtitle);
          
          iterations = 0;
          measureSubtitle.style.fontSize = `${subtitleSize}px`;
          
          while (iterations < maxIterations) {
            const subtitleCurrentWidth = measureSubtitle.getBoundingClientRect().width;
            const subtitleDifference = Math.abs(subtitleCurrentWidth - subtitleTargetWidth);
            
            if (subtitleDifference <= tolerance || subtitleCurrentWidth <= subtitleTargetWidth) break;
            
            const subtitleRatio = subtitleTargetWidth / subtitleCurrentWidth;
            subtitleSize = subtitleSize * subtitleRatio;
            measureSubtitle.style.fontSize = `${subtitleSize}px`;
            iterations++;
          }
          
          document.body.removeChild(measureSubtitle);
          subtitleElement.style.fontSize = `${subtitleSize}px`;
          setSubtitleFontSize(`${subtitleSize}px`);
        });
      };
      
      // Délayer encore plus le calcul initial pour ne pas bloquer le rendu
      if ('requestIdleCallback' in window) {
        requestIdleCallback(doAdjust, { timeout: 2000 });
      } else {
        setTimeout(() => requestAnimationFrame(doAdjust), 500);
      }
    };

    // Démarrer après un délai plus long pour laisser le rendu initial se terminer
    const timer = setTimeout(adjustFontSize, 300);
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(adjustFontSize, 200);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Vérifier si le texte de bienvenue fait plus de 8 lignes - Optimisé pour réduire les forced reflows
  useEffect(() => {
    const checkWelcomeTextHeight = () => {
      if (!welcomeTextRef.current) return;
      
      // Utiliser requestIdleCallback pour ne pas bloquer le rendu
      const doCheck = () => {
        requestAnimationFrame(() => {
          if (welcomeTextRef.current) {
            const lineHeight = parseFloat(getComputedStyle(welcomeTextRef.current).lineHeight) || 28;
            const maxHeight = lineHeight * 8;
            const actualHeight = welcomeTextRef.current.scrollHeight;
            setNeedsShowMoreWelcome(actualHeight > maxHeight);
          }
        });
      };
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(doCheck, { timeout: 500 });
      } else {
        requestAnimationFrame(doCheck);
      }
    };

    // Délayer le check initial pour ne pas bloquer le rendu
    const timer = setTimeout(checkWelcomeTextHeight, 300);
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkWelcomeTextHeight, 200);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Observer pour détecter quand la section des stats devient visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isStatsVisible) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isStatsVisible]);

  // Animation des chiffres - Plus rapide et fluide
  useEffect(() => {
    if (!isStatsVisible) return;

    // Utiliser requestIdleCallback pour ne pas bloquer le main thread
    const animateTo = (setter: (val: number) => void, target: number, duration: number) => {
      const startTime = performance.now();
      let rafId: number;
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function pour plus de fluidité (ease-out-cubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.floor(easeProgress * target);
        setter(current);

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          setter(target);
        }
      };

      // Utiliser requestIdleCallback si disponible, sinon requestAnimationFrame
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          rafId = requestAnimationFrame(animate);
        }, { timeout: 100 });
      } else {
        rafId = requestAnimationFrame(animate);
      }
      
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    };

    const cleanup1 = animateTo(setReussite, 99, 800);
    const cleanup2 = animateTo(setEleves, 1500, 1000);
    const cleanup3 = animateTo(setAnnee, 46, 1200);
    
    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
      if (cleanup3) cleanup3();
    };
  }, [isStatsVisible]);

  return (
    <div className="min-h-screen bg-white">
      <StructuredData />
      {/* Navigation Stanford - Structure Exacte */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Barre Supérieure - Transparente qui devient opaque au scroll */}
        <div className={`text-white transition-all duration-300 border-b border-white/10 ${isScrolled ? 'bg-[#2e2d29]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-center h-14 relative">
              {/* Logo à gauche - Uniquement sur la page d'accueil */}
              <div className="absolute left-4 lg:left-8 flex items-center z-10">
                <Image
                  src="/logo.png"
                  alt="Logo Les Récollets"
                  width={28}
                  height={28}
                  className="brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                  priority
                />
              </div>
              
              {/* Links centrés avec menus déroulants - Toujours présent pour mesurer la largeur */}
              <div 
                ref={navRef} 
                className={`flex items-center justify-center gap-3 lg:gap-7 text-xs lg:text-sm ${showHamburgerMenu ? 'absolute opacity-0 pointer-events-none -z-10' : ''}`}
              >
                {/* Structures - Visible uniquement sur petits écrans (quand navbar2 est masquée) */}
                <div className="lg:hidden relative group">
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
                    <Link href="/fournitures-scolaires/college" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors">Collège</Link>
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
                <div className="w-full flex items-center justify-end absolute inset-0">
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

      {/* Hero Section - Image du Bâtiment avec Texte Centré */}
      <section className="relative h-[85vh] md:h-screen overflow-hidden">
        {/* Navbar 2 - Au-dessus du hero - Masquée sur petits écrans */}
        <div className="hidden lg:block absolute top-14 left-0 right-0 z-10">
          <div className="w-3/4 mx-auto">
            <nav className="flex items-center justify-center gap-8 h-16 px-8">
              <Link 
                href="/structures/maternelle" 
                className="text-white text-xl font-semibold hover:text-gray-200 transition-colors relative group pb-1 flex items-center gap-1.5 whitespace-nowrap"
              >
                Maternelle
                <ChevronDown size={18} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#8C1515] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
              <span className="text-white/40 text-base">✦</span>
              <Link 
                href="/structures/primaire" 
                className="text-white text-xl font-semibold hover:text-gray-200 transition-colors relative group pb-1 flex items-center gap-1.5 whitespace-nowrap"
              >
                Primaire
                <ChevronDown size={18} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#8C1515] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
              <span className="text-white/40 text-base">✦</span>
              <Link 
                href="/structures/college" 
                className="text-white text-xl font-semibold hover:text-gray-200 transition-colors relative group pb-1 flex items-center gap-1.5 whitespace-nowrap"
              >
                Collège
                <ChevronDown size={18} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#8C1515] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
              <span className="text-white/40 text-base">✦</span>
              <Link 
                href="/structures/lycee-general-et-technologique" 
                className="text-white text-xl font-semibold hover:text-gray-200 transition-colors relative group pb-1 flex items-center gap-1.5 whitespace-nowrap"
              >
                Lycée
                <ChevronDown size={18} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#8C1515] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
              <span className="text-white/40 text-base">✦</span>
              <Link 
                href="/structures/lycee-professionnel" 
                className="text-white text-xl font-semibold hover:text-gray-200 transition-colors relative group pb-1 flex items-center gap-1.5 whitespace-nowrap"
              >
                Lycée Pro
                <ChevronDown size={18} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#8C1515] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
            </nav>
          </div>
        </div>
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Ensemble Scolaire Privé Les Récollets - Campus principal à Longwy"
            fill
            priority
            quality={50}
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          
          {/* Overlay avec dégradé optimal du haut vers le bas */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.78) 12%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.20) 100%)'
            }}
          />
        </div>

        {/* Contenu - CENTRÉ comme Stanford */}
        <div className="relative h-full flex flex-col items-center justify-center">
          {/* Titre Principal - CENTRÉ - 75% de la largeur desktop, 90% mobile avec 2 lignes */}
          <div className="w-full flex flex-col items-center">
            <h1 
              ref={titleRef}
              className="font-[var(--font-playfair)] font-bold text-white leading-none mb-4 md:whitespace-nowrap text-center w-full"
              style={{
                fontSize: titleFontSize,
                textShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.02em',
                whiteSpace: 'normal'
              }}
            >
              <span className="block md:inline w-full text-center">Les</span>{' '}
              <span className="block md:inline w-full text-center">Récollets</span>
            </h1>
            
            {/* Sous-titre avec fond gribouillis griffe */}
            <div className="relative inline-block px-6 py-2 w-[90%] md:w-auto">
              {/* SVG fond gribouillis - Style griffe dessinée à la main */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 700 60" 
                preserveAspectRatio="none"
              >
                {/* Plusieurs coups de griffe superposés pour effet organique */}
                <path 
                  d="M 3 30 C 8 10, 25 15, 50 18 S 100 25, 150 20 S 200 15, 250 22 S 300 28, 350 23 S 400 18, 450 24 S 500 30, 550 25 S 600 20, 650 28 L 697 30 C 695 50, 680 45, 660 42 S 620 38, 570 43 S 520 48, 470 42 S 420 36, 370 44 S 320 50, 270 43 S 220 36, 170 45 S 120 52, 70 44 S 30 38, 10 42 L 3 30 Z" 
                  fill="rgba(0, 0, 0, 0.95)"
                />
              </svg>
              <p 
                ref={subtitleRef}
                className="relative z-10 font-[var(--font-inter)] text-white tracking-[0.35em] font-black uppercase whitespace-nowrap text-center"
                style={{ 
                  fontSize: subtitleFontSize,
                  textShadow: '0px 4px 20px rgba(0, 0, 0, 1), 0px 2px 10px rgba(0, 0, 0, 1)'
                }}
              >
                Ensemble Scolaire Privé - Longwy
              </p>
            </div>
          </div>
        </div>

        {/* Bouton Rouge en bas - Explore Stanford */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-0 px-4">
          <button className="bg-[#8C1515] hover:bg-[#a01919] text-white font-[var(--font-inter)] font-semibold text-sm tracking-wide px-6 py-2 w-full md:w-3/4 transition-all duration-300 flex items-center justify-center gap-2 rounded-t-2xl group">
            <ChevronDown size={18} strokeWidth={2.5} className="animate-bounce" />
            Découvrir Les Récollets
            <ChevronDown size={18} strokeWidth={2.5} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* Section 3 Colonnes */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Trait rouge à 1/3 - S'arrête légèrement au-dessus des titres */}
            <div className="hidden md:block absolute left-1/3 -top-10 bottom-0 w-px bg-[#8C1515]/40"></div>
            {/* Trait rouge à 2/3 - S'arrête légèrement au-dessus des titres */}
            <div className="hidden md:block absolute left-2/3 -top-10 bottom-0 w-px bg-[#8C1515]/40"></div>
            
            {/* Colonne 1: ACTUALITÉS */}
            <div className="flex flex-col items-center">
              <h2 className="font-[var(--font-inter)] text-xl font-bold text-[#8C1515] mb-8 uppercase tracking-wide text-center">
                Actualités
              </h2>
              <div className="space-y-6 w-full">
                <article className="group cursor-pointer border-b border-gray-200 pb-5">
                  <p className="text-xs text-gray-500 mb-2 font-[var(--font-inter)] uppercase tracking-wide">
                    15 Novembre 2024
                  </p>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#8C1515] transition-colors leading-snug">
                    Cérémonie de remise des diplômes du baccalauréat
                  </h3>
                </article>
                <article className="group cursor-pointer border-b border-gray-200 pb-5">
                  <p className="text-xs text-gray-500 mb-2 font-[var(--font-inter)] uppercase tracking-wide">
                    08 Novembre 2024
                  </p>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#8C1515] transition-colors leading-snug">
                    Portes ouvertes : Découvrez nos établissements
                  </h3>
                </article>
                <article className="group cursor-pointer border-b border-gray-200 pb-5">
                  <p className="text-xs text-gray-500 mb-2 font-[var(--font-inter)] uppercase tracking-wide">
                    01 Novembre 2024
                  </p>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#8C1515] transition-colors leading-snug">
                    Nouveau partenariat avec l'Université de Lorraine
                  </h3>
                </article>
              </div>
            </div>

            {/* Colonne 2: ÉVÉNEMENTS */}
            <div className="flex flex-col items-center pl-6">
              <h2 className="font-[var(--font-inter)] text-xl font-bold text-[#8C1515] mb-8 uppercase tracking-wide text-center">
                Événements
              </h2>
              <div className="space-y-6 w-full">
                <div className="flex gap-5 border-b border-gray-200 pb-5">
                  <div className="flex-shrink-0 text-center">
                    <div className="font-[var(--font-inter)] text-4xl font-bold text-[#8C1515] leading-none">
                      12
                    </div>
                    <div className="text-xs text-gray-600 font-[var(--font-inter)] uppercase mt-1 tracking-wide">
                      Déc
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1 leading-tight">
                      Concert de Noël
                    </h3>
                    <p className="text-sm text-gray-600">
                      Chapelle des Récollets, 19h00
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 border-b border-gray-200 pb-5">
                  <div className="flex-shrink-0 text-center">
                    <div className="font-[var(--font-inter)] text-4xl font-bold text-[#8C1515] leading-none">
                      18
                    </div>
                    <div className="text-xs text-gray-600 font-[var(--font-inter)] uppercase mt-1 tracking-wide">
                      Déc
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1 leading-tight">
                      Vacances d'hiver
                    </h3>
                    <p className="text-sm text-gray-600">
                      Fermeture des établissements
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 border-b border-gray-200 pb-5">
                  <div className="flex-shrink-0 text-center">
                    <div className="font-[var(--font-inter)] text-4xl font-bold text-[#8C1515] leading-none">
                      09
                    </div>
                    <div className="text-xs text-gray-600 font-[var(--font-inter)] uppercase mt-1 tracking-wide">
                      Jan
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1 leading-tight">
                      Rentrée scolaire
                    </h3>
                    <p className="text-sm text-gray-600">
                      Reprise des cours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne 3: LIENS RAPIDES */}
            <div className="flex flex-col items-center">
              <h2 className="font-[var(--font-inter)] text-xl font-bold text-[#8C1515] mb-8 uppercase tracking-wide text-center">
                Liens Rapides
              </h2>
              <div className="space-y-4 w-full">
                <a href="#" className="block text-base text-[#006CB8] hover:text-[#8C1515] transition-colors font-medium border-b border-gray-200 pb-3">
                  Nos écoles
                </a>
                <a href="#" className="block text-base text-[#006CB8] hover:text-[#8C1515] transition-colors font-medium border-b border-gray-200 pb-3">
                  Admissions et inscriptions
                </a>
                <a href="#" className="block text-base text-[#006CB8] hover:text-[#8C1515] transition-colors font-medium border-b border-gray-200 pb-3">
                  Calendrier scolaire
                </a>
                <a href="#" className="block text-base text-[#006CB8] hover:text-[#8C1515] transition-colors font-medium border-b border-gray-200 pb-3">
                  Contact
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Bandeau Chiffres Clés */}
      <section 
        ref={statsRef} 
        className="banner-rouge py-6 sm:py-8"
        style={{
          backgroundColor: '#8C1515',
          background: 'linear-gradient(to right, #8C1515, #a01919)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          minHeight: '60px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div 
          className="overflow-hidden relative w-full"
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <div className="flex animate-scroll-banner-infinite" style={{ width: 'max-content' }}>
            {/* Dupliquer le contenu 20 fois pour un défilement infini fluide */}
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="flex items-center px-8 whitespace-nowrap flex-shrink-0"
                style={{
                  backgroundColor: 'transparent',
                }}
              >
                <p 
                  className="font-[var(--font-playfair)] text-center font-semibold whitespace-nowrap"
                  style={{ 
                    fontSize: 'clamp(0.875rem, 2.5vw, 2rem)',
                    lineHeight: '1.2',
                    color: '#ffffff',
                    backgroundColor: 'transparent',
                  }}
                >
                  L&apos;ensemble scolaire privé des Récollets : Offrir à votre enfant le privilège d&apos;un cadre exigeant pour une scolarité d&apos;exception.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Bienvenue et Galerie Photo */}
      <section className="bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Texte de Bienvenue */}
          <div className="mb-16">
            <h2 className="font-[var(--font-playfair)] text-3xl lg:text-4xl font-bold text-[#8C1515] mb-8 text-center">
              Bienvenue à l'Ensemble Scolaire Privé des Récollets
            </h2>
            
            <div 
              ref={welcomeTextRef}
              className={`max-w-4xl mx-auto space-y-6 text-gray-800 leading-relaxed ${!showMoreWelcome && needsShowMoreWelcome ? 'line-clamp-[5]' : ''}`}
            >
              <p className="font-[var(--font-inter)] text-sm lg:text-base">
                L'École Notre-Dame, le Collège, le Lycée Général et Technologique ainsi que le Lycée Professionnel Notre-Dame constituent l'Ensemble Scolaire Privé Catholique des Récollets. Il a pour vocation d'accueillir des garçons et des filles de toutes origines sans distinction aucune et pour ambition de les aider à grandir en humanité en ne réduisant pas chaque Jeune à ses résultats scolaires aussi excellents soient-ils.
              </p>
              
              <p className="font-[var(--font-inter)] text-sm lg:text-base">
                Être à l'écoute de chacun, l'aider à prendre confiance en lui en découvrant ses potentialités, l'encourager à travailler à la hauteur de celles-ci et, sans tomber dans le manichéisme, lui faire prendre conscience que tout ne se vaut pas : le savoir-être est révélateur d'une intégration et non des repères dont on parle tant !
              </p>
              
              <p className="font-[var(--font-inter)] text-sm lg:text-base">
                Vaste programme, certes exigeant (vertu de l'exemple pour tous les membres de notre Communauté Éducative) mais oh combien exaltant !
              </p>
              
              <p className="font-[var(--font-inter)] text-sm lg:text-base">
                L'École se doit de former les Citoyens de demain ; nous sommes partie prenante de cette mission confiée au système éducatif sans oublier, en tant qu'Établissement Catholique d'Enseignement, de faire découvrir à tous les Jeunes qui nous sont confiés le visage de l'autre à travers la diversité des visages rencontrés.
              </p>
              
              <p className="font-[var(--font-playfair)] text-lg lg:text-xl text-[#8C1515] text-right mt-8 italic">
                Signé Mr FRATINI
          </p>
        </div>
            {needsShowMoreWelcome && (
              <div className="max-w-4xl mx-auto mt-4">
                <button
                  onClick={() => setShowMoreWelcome(!showMoreWelcome)}
                  className="text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1"
                >
                  {showMoreWelcome ? 'Voir moins' : 'Voir plus'}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${showMoreWelcome ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Galerie Photo Auto-défilante */}
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll-horizontal gap-4 w-max">
              {/* Première série d'images - Format uniforme pour performance */}
              {useMemo(() => {
                const images = [
                  { src: '/CollegeVueCour.png', alt: 'Vue de la cour du Collège Les Récollets à Longwy' },
                  { src: '/Ecole.png', alt: 'Bâtiment de l\'école primaire et maternelle Les Récollets' },
                  { src: '/Lycée.png', alt: 'Bâtiment du Lycée Général et Technologique Les Récollets' },
                  { src: '/LyceePro.png', alt: 'Bâtiment du Lycée Professionnel Les Récollets' },
                  { src: '/hero.jpg', alt: 'Campus principal de l\'Ensemble Scolaire Privé Les Récollets à Longwy' }
                ];
                return [...Array(4)].map((_, i) => {
                  const imageIndex = i % images.length;
                  const image = images[imageIndex];
                  return (
                    <div key={`img-${i}`} className="flex-shrink-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={280}
                        height={280}
                        className="object-cover rounded-lg shadow-lg"
                        loading="lazy"
                        quality={50}
                        sizes="(max-width: 768px) 280px, 280px"
                      />
                    </div>
                  );
                });
              }, [])}
              {/* Dupliquer exactement pour créer une boucle infinie sans saccade */}
              {useMemo(() => {
                const images = [
                  { src: '/CollegeVueCour.png', alt: 'Vue de la cour du Collège Les Récollets à Longwy' },
                  { src: '/Ecole.png', alt: 'Bâtiment de l\'école primaire et maternelle Les Récollets' },
                  { src: '/Lycée.png', alt: 'Bâtiment du Lycée Général et Technologique Les Récollets' },
                  { src: '/LyceePro.png', alt: 'Bâtiment du Lycée Professionnel Les Récollets' },
                  { src: '/hero.jpg', alt: 'Campus principal de l\'Ensemble Scolaire Privé Les Récollets à Longwy' }
                ];
                return [...Array(4)].map((_, i) => {
                  const imageIndex = i % images.length;
                  const image = images[imageIndex];
                  return (
                    <div key={`img-duplicate-${i}`} className="flex-shrink-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={280}
                        height={280}
                        className="object-cover rounded-lg shadow-lg"
                        loading="lazy"
                        quality={50}
                        sizes="(max-width: 768px) 280px, 280px"
                      />
                    </div>
                  );
                });
              }, [])}
            </div>
          </div>
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
              <div className="font-[var(--font-inter)] text-xs text-gray-700 space-y-0.5 leading-snug">
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
              <div className="font-[var(--font-inter)] text-xs text-gray-700 space-y-0.5 leading-snug">
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
        <div className="border-t border-gray-400/50 py-2">
          <p className="text-center font-[var(--font-inter)] text-xs text-gray-600">
            © {new Date().getFullYear()} Les Récollets - Ensemble Scolaire Privé. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
