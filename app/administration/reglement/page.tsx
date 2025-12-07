'use client';

import { ChevronDown, ArrowLeft, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function ReglementPage() {
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
                className={`flex items-center gap-2 lg:gap-7 text-xs lg:text-sm absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${showHamburgerMenu ? 'opacity-0 pointer-events-none -z-10' : ''}`}
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
                    <Link href="/administration/reglement" className="block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors bg-[#8C1515] text-white">Règlement</Link>
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

      {/* Section Règlement avec animation de fondu */}
      <section className="bg-white py-16 pt-32 animate-fade-in">
        <div className="max-w-4xl mx-auto px-8">
          <div className="mb-12">
            <h2 className="font-[var(--font-playfair)] text-5xl lg:text-6xl font-bold text-[#8C1515] mb-6 text-center">
              Règlement Intérieur
            </h2>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8"></div>
            
            {/* Introduction */}
            <div className="mb-12">
              <h3 className="font-[var(--font-playfair)] text-2xl lg:text-3xl font-bold text-[#8C1515] mb-4 text-center">
                Vivre Ensemble
              </h3>
              <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                L'ensemble des règles qui suivent a pour but de favoriser la vie en communauté dans l'établissement, d'instaurer un climat de confiance et de dialogue, en pleine connaissance de ses droits et de ses devoirs, de garantir la tolérance et le respect d'autrui, ainsi que la protection de chacun contre toute agression physique ou morale.
              </p>
              <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed">
                Ce règlement constitue un contrat de vie scolaire, passé entre l'établissement, les parents ou personnes responsables de l'enfant et les élèves qui s'engagent à le respecter.
              </p>
            </div>
          </div>

          {/* Contenu du Règlement */}
          <div className="space-y-10">
            {/* Section 1 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                1/ PRÉSENCE ET ABSENCE DES ÉLÈVES
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · La présence des élèves à tous les cours prévus à l'emploi du temps de leur division est obligatoire. L'inscription à une option facultative (latin, DP3, Accompagnement éducatif...) entraîne l'obligation d'assiduité pendant tout le cycle concerné.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Toute absence prévisible doit faire l'objet d'une information écrite des parents. En cas d'absence imprévisible (maladie, accident...), le bureau des surveillants doit être informé le matin avant 09h et l'après-midi 15h (téléphone : <a href="tel:0382259928" className="text-[#8C1515] hover:underline">03 82 25 99 28</a>). Pour toutes autres demandes, téléphoner au secrétariat du collège (téléphone : <a href="tel:0382259920" className="text-[#8C1515] hover:underline">03 82 25 99 20</a>).
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Dans tous les cas, dès son retour, l'élève présentera aux surveillants un billet d'absence signé par les parents dans le carnet de correspondance indiquant le motif de l'absence.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · En cas de manquement à ces règles, des sanctions sont prévues par le règlement de l'ensemble scolaire.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                2/ RÉGIME DES SORTIES
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les demi-pensionnaires qui ne mangent pas exceptionnellement à la cantine doivent montrer un mot aux surveillants avant midi.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · En cas d'absence prévue d'un professeur, l'emploi du temps habituel pourra être modifié ou les élèves libérés. Les parents en seront informés par le biais du carnet de correspondance. Seuls les élèves autorisés par les parents (mot signé et vérifié avant le changement) pourront quitter l'établissement.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Le collège se réserve le droit de tous changements dans l'emploi du temps au cours de l'année (dans la grille d'horaires d'ouverture de l'établissement 8h00 à 11h50 et 13h à 16h50). Les activités extrascolaires ne pourront pas faire l'objet d'un motif d'absence valable.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les sorties non autorisées seront sanctionnées.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Avant de rentrer en classe, tout élève en retard passe au bureau des surveillants avec son carnet de correspondance. Des retards injustifiés et fréquents seront sanctionnés.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les autorisations de sorties peuvent à tous moments être supprimées en cas de manquements répétés au règlement.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                3/ DISCIPLINE GÉNÉRALE
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Chaque membre de la communauté scolaire est responsable de l'ordre et de la propreté de l'établissement (papiers, rangement des salles, respect du matériel, propreté des toilettes...). Si la dégradation est volontaire ou la conséquence d'un acte d'indiscipline ou d'une négligence caractérisée, la réparation financière sera totale ou partielle par la famille, sans exclure d'éventuelles sanctions disciplinaires.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · En cas de perte ou de dégradation des manuels scolaires prêtés par l'établissement, la responsabilité de l'élève est engagée. Des sanctions pourront être appliquées (remboursement ou remplacement de l'ouvrage).
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les élèves doivent se présenter dans une tenue vestimentaire propre et décente. Une tenue incorrecte ou trop dénudée, de même qu'un maquillage à outrance ne sera pas acceptée au sein de l'établissement.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Le port de couvre-chef (casquette, bonnet, bandana...) est interdit dans les bâtiments (couloirs, classes, restaurant scolaire, gymnase...).
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les téléphones portables, les baladeurs audio ou autres appareils électroniques comme consoles de jeu ne sont pas autorisés dans le collège. Les élèves n'apporteront pas de sommes importantes ou d'objets de valeur ne présentant pas d'utilité scolaire. En cas de manquement au règlement ils pourront être confisqués quelques jours. De plus aucune réclamation ne sera recevable en cas de vol ou de dégradation de tels objets, l'établissement ne peut être tenu responsable des pertes et vols commis.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · L'enregistrement d'un cours ainsi que la prise de photographies dans l'établissement d'élèves, de professeurs ou personnel est interdit et peut être puni par la loi.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les cours d'EPS sont obligatoires au même titre que les autres cours. Cependant, les élèves qui évoquent une inaptitude physique doivent le justifier par un certificat médical indiquant le caractère total ou partiel de l'inaptitude accompagné d'une dispense signée dans le carnet de correspondance comme l'exige la nouvelle réglementation du code de l'Education (Article R312-2). En aucun cas une dispense d'EPS ne peut être un motif d'absence de l'établissement, sauf autorisation préalable des surveillants (inaptitude de longue durée). Une tenue correcte est exigée pour le cours d'EPS. Tout oubli de tenue sportive sera sanctionné.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                4/ RESPECT
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Chacun fera preuve de politesse à l'égard d'autrui (élèves et adultes de l'établissement, quelque soit sa fonction). Il sera interdit toute violence verbale ou physique, observant le devoir de tolérance vis-à-vis d'autrui. Chacun veillera pendant les cours et lors des mouvements, à respecter le calme et le silence, indispensable au travail.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · L'élève ne pourra en aucun cas fumer ni introduire de tabac ou autres produits illicites à l'intérieur du collège, ainsi que de briquets ou allumettes. Le chewing-gum est interdit en classe. Cracher est une attitude inadmissible.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les jeux dangereux, les bousculades sont également à proscrire et par temps de neige ou de gel, les glissades et les boules de neige sont interdites. L'introduction dans l'établissement de tout objet sans relation avec les activités pédagogiques est interdite.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Aucun médicament ne doit être laissé à la libre disposition des élèves. Les élèves suivant un traitement médical déposent obligatoirement, chez les surveillants, leurs médicaments ainsi qu'une copie de l'ordonnance.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les manifestations d'affection entre élèves, excessives et répétées ne sont pas tolérées.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                5/ RESPECT DE L'OBLIGATION DE TRAVAIL
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Tout travail donné à un élève doit être exécuté et présenté par celui-ci à la date fixée. Le retard non motivé dans la remise d'un travail sera sanctionné.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Toute fraude à l'occasion d'un devoir ou d'un contrôle sera également punie.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les élèves devront être en possession du matériel scolaire nécessaire aux activités prévues à l'emploi du temps.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Tout refus de travail manifeste sera considéré comme un manquement au règlement et sera sanctionné comme tel.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Le carnet de correspondance est par excellence le lien entre les professeurs, la direction, les élèves et leur famille. Il est indispensable que l'élève puisse à tout moment le présenter. Il portera les renseignements d'état civil et scolaires, la signature type des parents, la grille de l'emploi du temps et sera signé régulièrement par les parents ou les responsables.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="border-l-4 border-[#8C1515] pl-6">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                6/ NON RESPECT DU RÈGLEMENT
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Le non respect du règlement et de la discipline sera sanctionné.
                </p>
                <p className="font-[var(--font-inter)] text-sm lg:text-base leading-relaxed">
                  · Les heures de retenue sont fixées par les surveillants ou les professeurs et non par les parents.
                </p>
              </div>
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

