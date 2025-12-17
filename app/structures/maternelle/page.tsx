'use client';

import { ChevronDown, ArrowLeft, Users, Clock, BookOpen, ExternalLink, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

interface Niveau {
  nom: string;
  classes: number;
  eleves: string;
}

export default function MaternellePage() {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
    const activitesRef = useRef<HTMLDivElement>(null);
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

  // Callbacks optimisés
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleSubmenu = useCallback((submenu: string) => {
    setOpenSubmenu(prev => prev === submenu ? null : submenu);
  }, []);

  // Données des niveaux (memoizées)
  const niveaux: Niveau[] = useMemo(() => [
    { nom: 'Petite Section', classes: 1, eleves: '≈ 25' },
    { nom: 'Moyenne Section', classes: 1, eleves: '≈ 25' },
    { nom: 'Grande Section', classes: 1, eleves: '≈ 25' },
  ], []);

  // Données des menus de navigation (memoizées)
  const navigationMenus = useMemo(() => ({
    structures: [
      { href: '/structures/maternelle', label: 'Maternelle', isActive: true },
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
      { href: '/restauration/maternelle', label: 'Maternelle' },
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
        <div ref={activitesRef} className="relative group">
          <button 
            type="button"
            className="hover:underline transition-all flex items-center gap-1 cursor-pointer"
            aria-expanded="false"
            aria-haspopup="true"
          >
            Activités
            <ChevronDown size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[180px] z-50">
            {navigationMenus.activites.map((item, index) => (
              <Link
                key={`activites-${index}`}
                href={item.href}
                className={`block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors ${
                  index === 0 ? 'first:rounded-t-lg' : ''
                } ${
                  index === navigationMenus.activites.length - 1 ? 'last:rounded-b-lg' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
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
            aria-hidden="true"
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
                <div className="absolute right-0 z-20">
                  <button
                    type="button"
                    onClick={toggleMobileMenu}
                    className="text-white hover:text-gray-200 transition-colors p-2 z-20 relative"
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
          {/* Titre */}
          <div className="mb-12 text-center">
            <h1 className="font-[var(--font-playfair)] text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4">
              École Maternelle
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto" aria-hidden="true"></div>
          </div>

          {/* Image Hero */}
          <div className="mb-16">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/Ecole.png"
                alt="École Maternelle des Récollets"
                width={1200}
                height={384}
                className="w-full h-full object-cover"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true"></div>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
              <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-[#8C1515] mb-6">
                Un environnement sûr et accueillant
              </h2>
              <div 
                ref={descriptionRef}
                className={`space-y-4 text-gray-700 ${!showMoreDescription && needsShowMore ? 'line-clamp-[5]' : ''}`}
              >
                <p className="font-[var(--font-inter)] text-base lg:text-lg leading-relaxed">
                  L&apos;école maternelle de l&apos;Ensemble Scolaire Privé des Récollets propose une éducation adaptée aux jeunes enfants avec trois classes de Petite à Grande Section. Située dans un environnement sûr et accueillant, elle favorise l&apos;apprentissage et le bien-être de chaque enfant.
                </p>
                <p className="font-[var(--font-inter)] text-base lg:text-lg leading-relaxed">
                  Les horaires sont conçus pour favoriser l&apos;apprentissage et le bien-être, avec des cours du lundi au vendredi, de 8h15 à 16h30, et une pause méridienne. Un service de garderie est proposé pour faciliter la conciliation entre vie professionnelle des parents et scolarité des enfants, ouvert de 7h15 à 18h30.
                </p>
                <p className="font-[var(--font-inter)] text-base lg:text-lg leading-relaxed">
                  L&apos;approche pédagogique stimule la curiosité, la créativité et le développement social des élèves, préparant progressivement leur transition vers l&apos;école élémentaire.
                </p>
              </div>
              {needsShowMore && (
                <button
                  type="button"
                  onClick={() => setShowMoreDescription(!showMoreDescription)}
                  className="mt-4 text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1"
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

          {/* Informations clés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white border-2 border-[#8C1515] rounded-xl p-6 text-center shadow-lg">
              <Users className="w-12 h-12 text-[#8C1515] mx-auto mb-4" aria-hidden="true" />
              <div className="text-4xl font-bold text-[#8C1515] mb-2">3</div>
              <div className="text-gray-600 font-[var(--font-inter)]">Classes</div>
            </div>
            <div className="bg-white border-2 border-[#8C1515] rounded-xl p-6 text-center shadow-lg">
              <Clock className="w-12 h-12 text-[#8C1515] mx-auto mb-4" aria-hidden="true" />
              <div className="text-lg font-semibold text-[#8C1515] mb-2">8h15 - 16h30</div>
              <div className="text-gray-600 font-[var(--font-inter)]">Horaires</div>
            </div>
            <div className="bg-white border-2 border-[#8C1515] rounded-xl p-6 text-center shadow-lg">
              <BookOpen className="w-12 h-12 text-[#8C1515] mx-auto mb-4" aria-hidden="true" />
              <div className="text-lg font-semibold text-[#8C1515] mb-2">PS - MS - GS</div>
              <div className="text-gray-600 font-[var(--font-inter)]">Niveaux</div>
            </div>
          </div>

          {/* Tableau des niveaux */}
          <div className="mb-16">
            <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-[#8C1515] mb-8 text-center">
              Organisation des classes
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {niveaux.map((niveau, index) => (
                  <div key={`niveau-${index}`} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                    <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#8C1515] mb-4">
                      {niveau.nom}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-[var(--font-inter)] text-gray-600">Classes :</span>
                        <span className="font-[var(--font-inter)] font-semibold text-gray-900">{niveau.classes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-[#8C1515] mb-8 text-center">
              Liens utiles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                href="/administration/tarif"
                className="bg-[#8C1515] text-white rounded-xl p-6 shadow-lg hover:bg-[#a01919] transition-colors flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2"
              >
                <div>
                  <h3 className="font-[var(--font-inter)] text-xl font-bold mb-2">Tarifs</h3>
                  <p className="font-[var(--font-inter)] text-sm opacity-90">Consulter les tarifs de l&apos;établissement</p>
                </div>
                <ExternalLink className="w-6 h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link 
                href="/administration/reglement"
                className="bg-[#8C1515] text-white rounded-xl p-6 shadow-lg hover:bg-[#a01919] transition-colors flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2"
              >
                <div>
                  <h3 className="font-[var(--font-inter)] text-xl font-bold mb-2">Règlement</h3>
                  <p className="font-[var(--font-inter)] text-sm opacity-90">Règlement intérieur de l&apos;école</p>
                </div>
                <ExternalLink className="w-6 h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
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
