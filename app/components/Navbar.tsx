'use client';

import { ChevronDown, ArrowLeft, Menu, X } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';

import type { NavItem } from "@/app/lib/types";

/* ────────────────────────────────────────────
   Données de navigation
   ──────────────────────────────────────────── */

const NAV_ITEMS: readonly NavItem[] = [
  {
    label: 'Structures', key: 'structures', hideOnHome: true,
    links: [
      { href: '/structures/ecole', label: 'École' },
      { href: '/structures/college', label: 'Collège' },
      { href: '/structures/lycee-general-et-technologique', label: 'Lycée Général et Technologique' },
      { href: '/structures/lycee-professionnel', label: 'Lycée Professionnel' },
    ],
  },
  {
    label: 'Administration', key: 'administration',
    links: [
      { href: '/administration/tarif', label: 'Tarifs' },
      { href: '/administration/taux-reussite', label: 'Taux de réussite' },
      { href: '/administration/fournitures-scolaires', label: 'Fournitures Scolaires' },
    ],
  },
  {
    label: 'Restauration', key: 'restauration',
    links: [
      { href: '/restauration/maternelle', label: 'Menu Maternelle' },
      { href: '/restauration/cantine', label: 'Menu Cantine' },
      { href: '/restauration/cafeteria', label: 'Menu Cafétéria' },
    ],
  },
  {
    label: 'Sport', key: 'sport',
    links: [
      { href: '/sport/calendrier-sportif', label: 'Calendrier sportif' },
      { href: '/sport/resultats-sportifs', label: 'Résultats sportifs' },
      { href: '/sport/inscription-unss', label: 'Inscription UNSS' },
    ],
  },
  {
    label: 'Activités', key: 'activites',
    links: [
      { href: '/activites/animation', label: 'Animations' },
      { href: '/activites/sorties-scolaires', label: 'Sorties scolaires' },
      { href: '/activites/les-choucas', label: 'Les Choucas' },
      { href: '/activites/ateliers', label: 'Ateliers du collège' },
    ],
  },
  {
    label: 'Contacts', key: 'contacts', dropdownAlign: 'right',
    links: [
      { href: '/structures/ecole#contact', label: 'École' },
      { href: '/structures/college#contact', label: 'Collège' },
      { href: '/structures/lycee-general-et-technologique#contact', label: 'Lycée' },
      { href: '/structures/lycee-professionnel#contact', label: 'Lycée Professionnel' },
    ],
  },
];

/* ────────────────────────────────────────────
   Props
   ──────────────────────────────────────────── */

interface NavbarProps {
  isHomePage?: boolean;
  activePage?: string;
}

/* ────────────────────────────────────────────
   Composant
   ──────────────────────────────────────────── */

export default function Navbar({ isHomePage = false, activePage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll listener (home page uniquement)
  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const toggleSubmenu = useCallback((menu: string) => {
    setOpenSubmenu((prev) => (prev === menu ? null : menu));
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = (href: string): boolean => activePage === href;
  const visibleItems = isHomePage ? NAV_ITEMS.filter((item) => !item.hideOnHome) : NAV_ITEMS;
  const activeClass = (href: string): string => isActive(href) ? 'bg-[#8C1515] text-white' : '';

  const headerBgClass = isHomePage
    ? `text-white transition-all duration-300 border-b border-white/10 ${isScrolled ? 'bg-[#2e2d29]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`
    : 'text-white transition-all duration-300 border-b border-white/10 bg-[#2e2d29]/95 backdrop-blur-md shadow-lg';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className={headerBgClass}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className={`flex items-center ${isHomePage ? 'justify-center' : 'justify-between'} h-14 relative`}>

              {/* Gauche */}
              {isHomePage ? (
                <div className="absolute left-4 lg:left-8 flex items-center z-10">
                  <NextImage
                    src="/logo.png"
                    alt="Logo Les Récollets"
                    width={32}
                    height={32}
                    className="brightness-0 invert opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]"
                    priority
                  />
                </div>
              ) : (
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-sm z-10">
                  <ArrowLeft size={18} strokeWidth={2} />
                </Link>
              )}

              {/* Navigation desktop */}
              <div
                ref={navRef}
                className={`hidden min-[850px]:flex items-center ${isHomePage ? 'justify-center gap-3 lg:gap-7' : 'gap-2 lg:gap-7 absolute left-1/2 -translate-x-1/2 whitespace-nowrap'} text-xs lg:text-sm`}
              >
                {visibleItems.map((item) => (
                  <div key={item.key} className="relative group">
                    <button className="hover:underline transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap">
                      {item.label}
                      <ChevronDown size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform" />
                    </button>
                    <div className={`absolute top-full ${item.dropdownAlign === 'right' ? 'right-0' : 'left-0'} mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[220px] z-50`}>
                      {item.links.map((link, i) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-4 py-2.5 hover:bg-[#8C1515] hover:text-white transition-colors ${i === 0 ? 'first:rounded-t-lg' : ''} ${i === item.links.length - 1 ? 'last:rounded-b-lg' : ''} ${activeClass(link.href)}`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bouton ECOLE DIRECT (desktop) */}
              <div className={`${isHomePage ? 'absolute right-4 lg:right-8' : ''} hidden min-[850px]:flex items-center z-20`}>
                <a
                  href="https://www.ecoledirecte.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#8C1515] text-white text-sm font-semibold rounded border border-white/30 hover:bg-[#a01919] transition-colors whitespace-nowrap"
                >
                  ECOLE DIRECT
                </a>
              </div>

              {/* Bouton hamburger */}
              {isHomePage ? (
                <div className="w-full flex items-center justify-between absolute inset-0 px-4 lg:px-8 max-[849px]:flex min-[850px]:hidden">
                  <div className="flex-shrink-0 w-10" />
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white hover:text-gray-200 transition-colors p-2 z-20 ml-auto"
                    aria-label="Menu"
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              ) : (
                <div className="absolute right-4 lg:right-8 max-[849px]:block min-[850px]:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white hover:text-gray-200 transition-colors p-2 z-20"
                    aria-label="Menu"
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile hamburger */}
      {isMobileMenuOpen && (
        <div className="fixed top-14 left-0 right-0 bg-white text-gray-800 shadow-xl z-[60] max-h-[80vh] overflow-y-auto max-[849px]:block min-[850px]:hidden">
          <div className="max-w-[1400px] mx-auto px-4 py-4">
            {visibleItems.map((item) => (
              <div key={item.key} className="mb-2">
                <button
                  onClick={() => toggleSubmenu(item.key)}
                  className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-semibold">{item.label}</span>
                  <ChevronDown size={18} className={`transition-transform ${openSubmenu === item.key ? 'rotate-180' : ''}`} />
                </button>
                {openSubmenu === item.key && (
                  <div className="ml-4 border-l-2 border-[#8C1515] pl-4 mt-2 space-y-2 pb-2">
                    {item.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className="block py-2 px-4 hover:bg-[#8C1515] hover:text-white rounded transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Bouton ECOLE DIRECT */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href="https://www.ecoledirecte.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 bg-[#8C1515] text-white text-sm font-semibold rounded border border-white/30 hover:bg-[#a01919] transition-colors text-center"
              >
                ECOLE DIRECT
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
