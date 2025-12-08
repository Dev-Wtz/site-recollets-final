'use client';

import { ChevronDown, ArrowLeft, Calendar, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function AnimationPage() {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

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

  const articles = [
    {
      id: 1,
      titre: 'Décoration de Noël',
      date: 'Décembre 2024',
      image: '/hero.jpg', // Utilisation de l'image hero comme placeholder
      texte: 'Les élèves de l\'ensemble scolaire des Récollets se sont mobilisés pour décorer l\'établissement aux couleurs de Noël. Cette activité a permis de renforcer l\'esprit de communauté et de partage, tout en créant une ambiance festive et chaleureuse pour tous.',
    },
  ];

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
                    <Link href="/activites/animation" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors first:rounded-t-lg bg-[#8C1515] text-white">Animation</Link>
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

      {/* Section Animation avec animation de fondu */}
      <section className="bg-white py-16 pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-12">
            <h2 className="font-[var(--font-playfair)] text-5xl lg:text-6xl font-bold text-[#8C1515] mb-6 text-center">
              Animations
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>
            
            {/* Texte descriptif */}
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <div 
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Découvrez les différentes animations organisées tout au long de l'année scolaire à l'Ensemble Scolaire Privé des Récollets. Ces moments de convivialité et de partage renforcent les liens entre les élèves et contribuent à créer une ambiance chaleureuse au sein de l'établissement.
                </p>
                <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed">
                  Chaque animation est l'occasion pour nos élèves de s'impliquer, de créer et de partager des moments inoubliables ensemble.
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

          {/* Articles du blog */}
          <div className="max-w-5xl mx-auto">
            {articles.map((article, index) => {
              // Article 1 (index 0) : image à gauche, texte à droite
              // Article 2 (index 1) : texte à gauche, image à droite
              // Article 3 (index 2) : image à gauche, texte à droite
              // etc.
              const imageLeft = index % 2 === 0; // Pair = image à gauche
              
              return (
                <div key={article.id}>
                  <article className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className={`w-full lg:w-1/2 h-48 lg:h-72 overflow-hidden ${
                      imageLeft ? 'lg:order-1' : 'lg:order-2'
                    }`}>
                      <Image
                        src={article.image}
                        alt={article.titre}
                        fill
                        className="object-cover"
                        quality={75}
                        loading="lazy"
                        sizes="(max-width: 1024px) 50vw, 50vw"
                      />
                    </div>

                    {/* Bloc Texte */}
                    <div className={`w-full lg:w-1/2 bg-gray-100 p-6 lg:p-8 flex flex-col justify-between ${
                      imageLeft ? 'lg:order-2' : 'lg:order-1'
                    }`}>
                      <div>
                        {/* Date et Titre en haut */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 text-gray-500 mb-1.5">
                            <Calendar size={14} />
                            <span className="font-[var(--font-inter)] text-xs">{article.date}</span>
                          </div>
                          <h3 className="font-[var(--font-playfair)] text-xl lg:text-2xl font-bold text-[#8C1515]">
                            {article.titre}
                          </h3>
                        </div>

                        {/* Texte */}
                        <p className="font-[var(--font-inter)] text-sm lg:text-base text-gray-700 leading-relaxed">
                          {article.texte}
                        </p>
                      </div>
                    </div>
                  </article>
                  
                  {/* Trait rouge animé entre les articles (sauf le dernier) */}
                  {index < articles.length - 1 && (
                    <div className="flex justify-center py-6">
                      <div className="h-px bg-[#8C1515] animate-line-expand mx-auto rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
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

