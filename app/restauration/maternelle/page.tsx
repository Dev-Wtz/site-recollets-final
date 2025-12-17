'use client';

import { ChevronDown, ArrowLeft, Menu, X, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

export default function MaternellePage() {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Afficher le menu hamburger à 849px et moins, navbar normale à 850px et plus
  useEffect(() => {
    const checkNavbarWidth = () => {
      const windowWidth = window.innerWidth;
      setShowHamburgerMenu(windowWidth < 850);
    };

    checkNavbarWidth();
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        checkNavbarWidth();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  // Callback optimisé pour le toggle du menu mobile
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Callback optimisé pour fermer le menu mobile
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Callback optimisé pour le toggle des sous-menus
  const toggleSubmenu = useCallback((submenu: string) => {
    setOpenSubmenu(prev => prev === submenu ? null : submenu);
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

  // Données des menus de navigation (memoizées pour éviter les re-renders)
  const navigationMenus = useMemo(() => ({
    structures: [
      { href: '/structures/maternelle', label: 'Maternelle' },
      { href: '/structures/primaire', label: 'Primaire' },
      { href: '/structures/college', label: 'Collège' },
      { href: '/structures/lycee-general-et-technologique', label: 'Lycée Général et Technologique' },
      { href: '/structures/lycee-professionnel', label: 'Lycée Professionnel' },
    ],
    administration: [
      { href: '/administration/tarif', label: 'Tarif' },
      { href: '/administration/reglement', label: 'Règlement' },
      { href: '/administration/taux-reussite', label: 'Taux de réussite' },
    ],
    restauration: [
      { href: '/restauration/maternelle', label: 'Maternelle', isActive: true },
      { href: '/restauration/cantine', label: 'Cantine' },
      { href: '/restauration/cafeteria', label: 'Cafétéria' },
    ],
    fournitures: [
      { href: '/fournitures-scolaires/ecole', label: 'École' },
      { href: '/fournitures-scolaires/college', label: 'Collège' },
      { href: '/fournitures-scolaires/lycee-pro', label: 'Lycée Pro' },
    ],
    sport: [
      { href: '/sport/calendrier-sportif', label: 'Calendrier sportif' },
      { href: '/sport/resultats-sportifs', label: 'Résultats sportifs' },
      { href: '/sport/inscription-unss', label: 'Inscription UNSS' },
    ],
    activites: [
      { href: '/activites/animation', label: 'Animation' },
      { href: '/activites/sorties-scolaires', label: 'Sorties scolaires' },
      { href: '/activites/les-choucas', label: 'Les Choucas' },
      { href: '/activites/ateliers', label: 'Ateliers' },
    ],
  }), []);

  // Composant de menu déroulant desktop (memoizé)
  const DesktopDropdownMenu = useMemo(() => {
    const MenuItem = ({ 
      label, 
      items, 
      menuKey 
    }: { 
      label: string; 
      items: Array<{ href: string; label: string; isActive?: boolean }>; 
      menuKey: string;
    }) => (
      <div className="relative group">
        <button 
          type="button"
          className="hover:underline transition-all flex items-center gap-1 cursor-pointer"
          aria-expanded="false"
          aria-haspopup="true"
        >
          {label}
          <ChevronDown size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform" />
        </button>
        <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[220px] z-50">
          {items.map((item, index) => (
            <Link
              key={`${menuKey}-${index}`}
              href={item.href}
              className={`block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors ${
                index === 0 ? 'first:rounded-t-lg' : ''
              } ${
                index === items.length - 1 ? 'last:rounded-b-lg' : ''
              } ${
                item.isActive ? 'bg-[#8C1515] text-white' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    );

    return (
      <div 
        ref={navRef}
        className={`flex items-center gap-2 lg:gap-7 text-xs lg:text-sm absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${
          showHamburgerMenu ? 'opacity-0 pointer-events-none -z-10' : ''
        }`}
      >
        <MenuItem label="Structures" items={navigationMenus.structures} menuKey="structures" />
        <MenuItem label="Administration" items={navigationMenus.administration} menuKey="administration" />
        <MenuItem label="Restauration" items={navigationMenus.restauration} menuKey="restauration" />
        <div className="relative group">
          <button 
            type="button"
            className="hover:underline transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
            aria-expanded="false"
            aria-haspopup="true"
          >
            Fournitures Scolaires
            <ChevronDown size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[180px] z-50">
            {navigationMenus.fournitures.map((item, index) => (
              <Link
                key={`fournitures-${index}`}
                href={item.href}
                className={`block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors ${
                  index === 0 ? 'first:rounded-t-lg' : ''
                } ${
                  index === navigationMenus.fournitures.length - 1 ? 'last:rounded-b-lg' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <MenuItem label="Sport" items={navigationMenus.sport} menuKey="sport" />
        <MenuItem label="Activités" items={navigationMenus.activites} menuKey="activites" />
      </div>
    );
  }, [showHamburgerMenu, navigationMenus]);

  // Composant de menu mobile (memoizé)
  const MobileMenu = useMemo(() => {
    if (!showHamburgerMenu || !isMobileMenuOpen) return null;

    const MobileMenuItem = ({ 
      label, 
      items, 
      menuKey 
    }: { 
      label: string; 
      items: Array<{ href: string; label: string }>; 
      menuKey: string;
    }) => (
      <div className="mb-2">
        <button
          type="button"
          onClick={() => toggleSubmenu(menuKey)}
          className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
          aria-expanded={openSubmenu === menuKey}
        >
          <span className="font-semibold">{label}</span>
          <ChevronDown 
            size={18} 
            className={`transition-transform ${openSubmenu === menuKey ? 'rotate-180' : ''}`}
          />
        </button>
        {openSubmenu === menuKey && (
          <div className="ml-4 border-l-2 border-[#8C1515] pl-4 mt-2">
            {items.map((item, index) => (
              <Link
                key={`mobile-${menuKey}-${index}`}
                href={item.href}
                onClick={closeMobileMenu}
                className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );

    return (
      <div className="fixed top-14 left-0 right-0 bg-white text-gray-800 shadow-xl z-[60] max-h-[80vh] overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <MobileMenuItem label="Structures" items={navigationMenus.structures} menuKey="structures" />
          <MobileMenuItem label="Administration" items={navigationMenus.administration} menuKey="administration" />
          <MobileMenuItem label="Restauration" items={navigationMenus.restauration} menuKey="restauration" />
          <MobileMenuItem label="Fournitures Scolaires" items={navigationMenus.fournitures} menuKey="fournitures" />
          <MobileMenuItem label="Sport" items={navigationMenus.sport} menuKey="sport" />
          <MobileMenuItem label="Activités" items={navigationMenus.activites} menuKey="activites" />
        </div>
      </div>
    );
  }, [showHamburgerMenu, isMobileMenuOpen, openSubmenu, navigationMenus, toggleSubmenu, closeMobileMenu]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="text-white transition-all duration-300 border-b border-white/10 bg-[#2e2d29]/95 backdrop-blur-md shadow-lg">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-14 relative">
              {/* Bouton retour */}
              <Link 
                href="/" 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity text-sm z-10"
                aria-label="Retour à l&apos;accueil"
              >
                <ArrowLeft size={18} strokeWidth={2} />
              </Link>
              
              {/* Menu desktop */}
              {DesktopDropdownMenu}
            
              {/* Bouton hamburger */}
              {showHamburgerMenu && (
                <div className="absolute right-4 lg:right-8">
                  <button
                    type="button"
                    onClick={toggleMobileMenu}
                    className="text-white hover:text-gray-200 transition-colors p-2 z-20"
                    aria-label="Menu"
                    aria-expanded={isMobileMenuOpen}
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {MobileMenu}

      {/* Section principale */}
      <section className="bg-white py-16 pt-32 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-12">
            <h1 className="font-[var(--font-playfair)] text-5xl lg:text-6xl font-bold text-[#8C1515] mb-6 text-center">
              Restauration Maternelle
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-8" aria-hidden="true"></div>
            
            {/* Description */}
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <div 
                ref={descriptionRef}
                className={`space-y-4 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  La restauration maternelle des Récollets s&apos;engage à offrir une alimentation de qualité, équilibrée et adaptée aux besoins nutritionnels des plus jeunes. Nos repas sont préparés avec soin.
                </p>
                <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  Chaque menu est élaboré par notre équipe de restauration en collaboration avec l&apos;équipe Gourmandises Et Passions, garantissant des repas variés, savoureux et respectueux des besoins spécifiques des enfants en maternelle.
                </p>
                <p className="font-[var(--font-inter)] text-base lg:text-lg text-gray-700 leading-relaxed font-semibold text-[#8C1515]">
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
                <Image
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
              className="flex items-center gap-2 px-6 py-3 bg-[#8C1515] text-white rounded-lg hover:bg-[#a01919] transition-colors font-[var(--font-inter)] font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2"
              aria-label="Télécharger le menu maternelle"
            >
              <Download size={20} aria-hidden="true" />
              Télécharger le menu
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white via-gray-50 via-gray-100 to-gray-300 border-t-4 border-[#8C1515]">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Adresse */}
            <div>
              <h3 className="font-[var(--font-inter)] text-xs font-bold mb-1.5 uppercase tracking-wide text-[#8C1515]">
                Adresse
              </h3>
              <address className="font-[var(--font-inter)] text-xs text-gray-700 leading-snug not-italic">
                44 rue du Général Pershing<br />
                54400 LONGWY
              </address>
            </div>

            {/* Horaires */}
            <div>
              <h3 className="font-[var(--font-inter)] text-xs font-bold mb-1.5 uppercase tracking-wide text-[#8C1515]">
                Horaires d&apos;Ouverture
              </h3>
              <div className="font-[var(--font-inter)] text-xs text-gray-700 space-y-0.5">
                <p>Lundi au Vendredi : 8h – 12h et 13h – 17h</p>
                <p>Mercredi : 8h – 12h</p>
                <p>Samedi, Dimanche et Jours Fériés : Fermé</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-[var(--font-inter)] text-xs font-bold mb-1.5 uppercase tracking-wide text-[#8C1515]">
                Contact
              </h3>
              <div className="font-[var(--font-inter)] text-xs text-gray-700 space-y-0.5">
                <p>
                  <span className="text-gray-500">Tél :</span>{' '}
                  <a 
                    href="tel:0382259920" 
                    className="hover:text-[#8C1515] transition-colors"
                    aria-label="Appeler le 03 82 25 99 20"
                  >
                    03 82 25 99 20
                  </a>
                </p>
                <p>
                  <span className="text-gray-500">Mail :</span>{' '}
                  <a 
                    href="mailto:accueil.ensemblescolaire@lesrecollets.org" 
                    className="hover:text-[#8C1515] transition-colors break-all"
                    aria-label="Envoyer un email"
                  >
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
