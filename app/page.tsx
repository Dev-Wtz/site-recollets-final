'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import StructuredData from "@/app/components/StructuredData";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useShowMoreText } from "@/app/hooks/useShowMoreText";

/* ────────────────────────────────────────────
   Constantes
   ──────────────────────────────────────────── */

const MONTH_MAP: Record<string, number> = {
  janvier: 1, février: 2, mars: 3, avril: 4, mai: 5, juin: 6,
  juillet: 7, août: 8, septembre: 9, octobre: 10, novembre: 11, décembre: 12,
};

const MONTH_REGEX = '(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)';

const GALLERY_IMAGES = [
  { src: '/CollegeVueCour.png', alt: 'Vue de la cour du Collège Les Récollets à Longwy' },
  { src: '/Ecole.png', alt: "Bâtiment de l'école primaire et maternelle Les Récollets" },
  { src: '/Lycée.png', alt: 'Bâtiment du Lycée Général et Technologique Les Récollets' },
  { src: '/LyceePro.png', alt: 'Bâtiment du Lycée Professionnel Les Récollets' },
  { src: '/hero.jpg', alt: "Campus principal de l'Ensemble Scolaire Privé Les Récollets à Longwy" },
];

const HERO_NAV_LINKS = [
  { href: '/structures/ecole', label: 'École' },
  { href: '/structures/college', label: 'Collège' },
  { href: '/structures/lycee-general-et-technologique', label: 'Lycée' },
  { href: '/structures/lycee-professionnel', label: 'Lycée Pro' },
];

const QUICK_LINKS = [
  { href: '/administration/tarif', label: 'Tarifs' },
  { href: '/restauration/maternelle', label: 'Menu Maternelle' },
  { href: '/restauration/cantine', label: 'Menu Restaurant Scolaire' },
  { href: '/restauration/cafeteria', label: 'Menu Cafétéria du Lycée' },
] as const;

const CONTACT_LINKS = [
  { href: '/structures/ecole#contact', label: 'École' },
  { href: '/structures/college#contact', label: 'Collège' },
  { href: '/structures/lycee-general-et-technologique#contact', label: 'Lycée' },
  { href: '/structures/lycee-professionnel#contact', label: 'Lycée Pro' },
] as const;

/* ────────────────────────────────────────────
   Utilitaires de dates
   ──────────────────────────────────────────── */

function parseDate(dateStr: string): Date {
  const currentYear = new Date().getFullYear();

  // Format "1er septembre" ou "17 octobre"
  const matchDay = dateStr.match(new RegExp(`(\\d+)(?:er)?\\s+${MONTH_REGEX}(?:\\s+(\\d{4}))?`, 'i'));
  if (matchDay) {
    const day = parseInt(matchDay[1]);
    const month = MONTH_MAP[matchDay[2].toLowerCase()];
    const year = matchDay[3] ? parseInt(matchDay[3]) : currentYear;
    return new Date(year, month - 1, day);
  }

  // Format "Décembre 2025"
  const matchMonth = dateStr.match(new RegExp(`${MONTH_REGEX}\\s+(\\d{4})`, 'i'));
  if (matchMonth) {
    return new Date(parseInt(matchMonth[2]), MONTH_MAP[matchMonth[1].toLowerCase()] - 1, 1);
  }

  // Format "7 au 12 décembre"
  const matchRange = dateStr.match(new RegExp(`(\\d+)\\s+au\\s+\\d+\\s+${MONTH_REGEX}`, 'i'));
  if (matchRange) {
    return new Date(currentYear, MONTH_MAP[matchRange[2].toLowerCase()] - 1, parseInt(matchRange[1]));
  }

  // Format "11 et 15 décembre"
  const matchAnd = dateStr.match(new RegExp(`(\\d+)\\s+et\\s+\\d+\\s+${MONTH_REGEX}`, 'i'));
  if (matchAnd) {
    return new Date(currentYear, MONTH_MAP[matchAnd[2].toLowerCase()] - 1, parseInt(matchAnd[1]));
  }

  return new Date(0);
}

function formatEventDate(dateStr: string): { day: string; month: string } {
  const matchDay = dateStr.match(new RegExp(`(\\d+)(?:er)?\\s+${MONTH_REGEX}`, 'i'));
  if (matchDay) {
    return { day: matchDay[1], month: matchDay[2].substring(0, 3).toUpperCase() };
  }

  const matchMonth = dateStr.match(new RegExp(`${MONTH_REGEX}\\s+(\\d{4})`, 'i'));
  if (matchMonth) {
    return { day: '01', month: matchMonth[1].substring(0, 3).toUpperCase() };
  }

  const matchRange = dateStr.match(new RegExp(`(\\d+)\\s+au\\s+\\d+\\s+${MONTH_REGEX}`, 'i'));
  if (matchRange) {
    return { day: matchRange[1], month: matchRange[2].substring(0, 3).toUpperCase() };
  }

  const matchAnd = dateStr.match(new RegExp(`(\\d+)\\s+et\\s+\\d+\\s+${MONTH_REGEX}`, 'i'));
  if (matchAnd) {
    return { day: matchAnd[1], month: matchAnd[2].substring(0, 3).toUpperCase() };
  }

  return { day: '-', month: '-' };
}

/* ────────────────────────────────────────────
   Données des événements
   ──────────────────────────────────────────── */

const RAW_EVENTS = [
  {
    titre: 'Journée des métiers',
    date: '7 mai 2026',
    texte: "Journée consacrée à la découverte des métiers avec des interventions et des échanges pour aider les élèves à construire leur orientation.",
    link: '/activites/sorties-scolaires',
  },
  {
    titre: 'Journée espagnole',
    date: '30 avril 2026',
    texte: "Journée dédiée à la langue et à la culture espagnoles : ateliers, découvertes et convivialité au sein de l'établissement.",
    link: '/activites/sorties-scolaires',
  },
  {
    titre: 'Journée Portes Ouvertes Lycée Professionnel',
    date: '27 mars 2026',
    texte: "Journée portes ouvertes du lycée professionnel le 27 mars 2026 de 15h à 20h (vide-dressing ouvert à tous).",
    link: '/structures/lycee-professionnel',
  },
  {
    titre: 'Décoration de Noël',
    date: 'Décembre 2025',
    texte: "Les élèves de l'ensemble scolaire des Récollets se sont mobilisés pour décorer l'établissement aux couleurs de Noël.",
    link: '/activites/animation',
  },
  {
    titre: 'Rentrée scolaire',
    date: '1er septembre 2025',
    texte: "Rentrée scolaire pour tous les élèves de l'établissement. Un moment important qui marque le début d'une nouvelle année scolaire riche en apprentissages et en découvertes.",
    link: '/activites/sorties-scolaires',
  },
  {
    titre: 'Baden Baden - Marché de Noël en Allemagne',
    date: '17 octobre 2025',
    texte: "Sortie à Baden Baden pour découvrir le marché de Noël en Allemagne. Une expérience culturelle et linguistique qui permet aux élèves de s'immerger dans les traditions allemandes.",
    link: '/activites/sorties-scolaires',
  },
  {
    titre: 'Festival du film italien',
    date: '6 novembre 2025',
    texte: "Participation au festival du film italien. Les élèves découvrent la richesse du cinéma transalpin et explorent différentes formes d'expression artistique à travers le 7ème art.",
    link: '/activites/sorties-scolaires',
  },
  {
    titre: 'Vacances Scolaire',
    date: '11 avril',
    texte: "Début des vacances scolaires pour les élèves de l'établissement.",
    link: '/activites/sorties-scolaires',
  },
  {
    titre: 'Championnat Grand Est UGSEL de bad',
    date: '30 mars 2023',
    texte: 'Nos filles ont brillé en décrochant 5 qualifications pour le championnat de France en mai prochain.',
    link: '/sport/resultats-sportifs',
  },
  {
    titre: 'Olympiades UNSS LYCÉE',
    date: '30 mars 2023',
    texte: 'Bravo à tous pour leurs belles performances.',
    link: '/sport/resultats-sportifs',
  },
  {
    titre: 'Championnats de France de natation (UGSEL)',
    date: '17 mars 2023',
    texte: 'Nos 12 nageurs ont disputé le championnat de France de natation Ugsel durant ces deux derniers jours à Cambrai.',
    link: '/sport/resultats-sportifs',
  },
];

/* ────────────────────────────────────────────
   Composant Home
   ──────────────────────────────────────────── */

export default function Home() {
  // --- État ---
  const [titleFontSize, setTitleFontSize] = useState('9vw');
  const [subtitleFontSize, setSubtitleFontSize] = useState('1.125vw');
  const {
    ref: welcomeTextRef,
    expanded: showMoreWelcome,
    needsShowMore: needsShowMoreWelcome,
    toggle: toggleShowMoreWelcome,
  } = useShowMoreText(8);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [, setReussite] = useState(0);
  const [, setEleves] = useState(0);
  const [, setAnnee] = useState(0);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  // --- Données mémorisées ---
  const sortedEvents = useMemo(() => {
    return RAW_EVENTS
      .map((e) => ({ ...e, dateSort: parseDate(e.date) }))
      .sort((a, b) => b.dateSort.getTime() - a.dateSort.getTime())
      .slice(0, 3);
  }, []);

  const galleryItems = useMemo(() => {
    const items = [...Array(4)].map((_, i) => GALLERY_IMAGES[i % GALLERY_IMAGES.length]);
    return [...items, ...items]; // Duplication pour boucle infinie
  }, []);

  // --- Effet : ajustement dynamique de la taille du titre (temps réel) ---
  useEffect(() => {
    const adjustFontSize = () => {
      if (!titleRef.current || !subtitleRef.current) return;

      const windowWidth = window.innerWidth;
      const isMobile = windowWidth < 850;
      const targetWidth = windowWidth * (isMobile ? 0.90 : 0.75);
      const titleEl = titleRef.current;
      const subtitleEl = subtitleRef.current;
      if (!titleEl || !subtitleEl) return;

      // Mesure du titre
      const titleFont = getComputedStyle(titleEl).fontFamily || 'Playfair Display, serif';
      const textToMeasure = 'Les Récollets';
      const measureEl = document.createElement('span');
      measureEl.style.cssText = `position:absolute;top:-9999px;left:-9999px;visibility:hidden;white-space:nowrap;font-family:${titleFont};font-weight:bold;letter-spacing:-0.02em`;
      measureEl.textContent = textToMeasure;
      document.body.appendChild(measureEl);

      let titleSize = targetWidth / 8.5;
      measureEl.style.fontSize = `${titleSize}px`;

      for (let i = 0; i < 20; i++) {
        const currentWidth = measureEl.getBoundingClientRect().width;
        if (Math.abs(currentWidth - targetWidth) <= 2) break;
        titleSize *= targetWidth / currentWidth;
        measureEl.style.fontSize = `${titleSize}px`;
      }

      document.body.removeChild(measureEl);
      titleEl.style.fontSize = `${titleSize}px`;
      setTitleFontSize(`${titleSize}px`);

      // Mesure du sous-titre
      const subtitleFont = getComputedStyle(subtitleEl).fontFamily || 'Inter, sans-serif';
      let subtitleSize = titleSize * 0.12;
      const measureSub = document.createElement('span');
      measureSub.style.cssText = `position:absolute;top:-9999px;left:-9999px;visibility:hidden;white-space:nowrap;font-family:${subtitleFont};font-weight:900;letter-spacing:0.35em`;
      measureSub.textContent = 'Ensemble Scolaire Privé';
      document.body.appendChild(measureSub);
      measureSub.style.fontSize = `${subtitleSize}px`;

      for (let i = 0; i < 20; i++) {
        const currentWidth = measureSub.getBoundingClientRect().width;
        if (Math.abs(currentWidth - targetWidth) <= 2 || currentWidth <= targetWidth) break;
        subtitleSize *= targetWidth / currentWidth;
        measureSub.style.fontSize = `${subtitleSize}px`;
      }

      document.body.removeChild(measureSub);
      subtitleEl.style.fontSize = `${subtitleSize}px`;
      setSubtitleFontSize(`${subtitleSize}px`);
    };

    // Exécution immédiate au prochain frame
    const rafId = requestAnimationFrame(adjustFontSize);

    // ResizeObserver + rAF throttle pour réactivité temps réel
    let pendingRaf: number | null = null;
    const scheduleAdjust = () => {
      if (pendingRaf !== null) return;
      pendingRaf = requestAnimationFrame(() => {
        pendingRaf = null;
        adjustFontSize();
      });
    };

    const ro = new ResizeObserver(scheduleAdjust);
    if (heroSectionRef.current) ro.observe(heroSectionRef.current);

    // Fallback resize (orientation, DevTools, etc.)
    window.addEventListener('resize', scheduleAdjust, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      if (pendingRaf !== null) cancelAnimationFrame(pendingRaf);
      ro.disconnect();
      window.removeEventListener('resize', scheduleAdjust);
    };
  }, []);

  // --- Effet : observer la visibilité de la section stats ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isStatsVisible) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [isStatsVisible]);

  // --- Effet : animation des chiffres ---
  useEffect(() => {
    if (!isStatsVisible) return;

    const animateTo = (setter: (v: number) => void, target: number, duration: number) => {
      const startTime = performance.now();
      let rafId: number;

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        setter(Math.floor(eased * target));
        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          setter(target);
        }
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => { rafId = requestAnimationFrame(animate); }, { timeout: 100 });
      } else {
        rafId = requestAnimationFrame(animate);
      }

      return () => { if (rafId) cancelAnimationFrame(rafId); };
    };

    const cleanups = [
      animateTo(setReussite, 99, 800),
      animateTo(setEleves, 1500, 1000),
      animateTo(setAnnee, 46, 1200),
    ];

    return () => cleanups.forEach((fn) => fn?.());
  }, [isStatsVisible]);

  /* ──────────── Rendu ──────────── */

  return (
    <div className="min-h-screen bg-white">
      <StructuredData />
      <Navbar isHomePage />

      {/* ═══════ Hero Section ═══════ */}
      <section ref={heroSectionRef} className="relative h-[100svh] min-h-[500px] max-h-[900px] md:max-h-none md:h-screen overflow-hidden">
        {/* Navigation secondaire (desktop uniquement) */}
        <div className="hidden lg:block absolute top-14 left-0 right-0 z-10">
          <div className="max-w-4xl xl:max-w-5xl mx-auto px-4">
            <nav className="flex items-center justify-center gap-4 xl:gap-8 h-16">
              {HERO_NAV_LINKS.map((link, i) => (
                <React.Fragment key={link.href}>
                  {i > 0 && <span className="text-white/40 text-base">✦</span>}
                  <Link
                    href={link.href}
                    className="text-white text-lg xl:text-xl font-semibold hover:text-gray-200 transition-colors relative group pb-1 flex items-center gap-1.5 whitespace-nowrap"
                  >
                    {link.label}
                    <ChevronDown size={18} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#8C1515] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Image de fond */}
        <div className="absolute inset-0">
          <NextImage
            src="/hero.jpg"
            alt="Ensemble Scolaire Privé Les Récollets - Campus principal à Longwy"
            fill
            priority
            quality={75}
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.78) 12%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.20) 100%)',
            }}
          />
        </div>

        {/* Titre principal centré */}
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="w-full flex flex-col items-center">
            <div className="relative inline-block py-2 mb-2 sm:mb-4">
              <p
                ref={subtitleRef}
                className="relative z-10 font-[var(--font-inter)] text-white tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em] font-black uppercase whitespace-nowrap text-center"
                style={{
                  fontSize: subtitleFontSize,
                  textShadow: '0px 0px 8px rgba(0,0,0,0.9), 0px 0px 16px rgba(0,0,0,0.8), 0px 4px 20px rgba(0,0,0,1), 0px 2px 10px rgba(0,0,0,1)',
                  WebkitTextStroke: '0.5px rgba(0,0,0,0.5)',
                }}
              >
                Ensemble Scolaire Privé
              </p>
            </div>

            <h1
              ref={titleRef}
              className="font-[var(--font-playfair)] font-bold leading-none whitespace-nowrap text-center w-full select-none"
              style={{
                fontSize: titleFontSize,
                color: '#ffffff',
                textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0px 0px 4px rgba(0,0,0,0.6)',
                letterSpacing: '-0.02em',
                textRendering: 'optimizeLegibility',
              }}
            >
              Les Récollets
            </h1>
          </div>
        </div>

        {/* Bouton "Découvrir" */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center px-4 sm:px-8">
          <button className="bg-[#8C1515] hover:bg-[#a01919] text-white font-[var(--font-inter)] font-semibold text-xs sm:text-sm tracking-wide px-4 sm:px-6 py-2.5 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-2xl transition-all duration-300 flex items-center justify-center gap-2 rounded-t-2xl group">
            <ChevronDown size={18} strokeWidth={2.5} className="animate-bounce" />
            Découvrir Les Récollets
            <ChevronDown size={18} strokeWidth={2.5} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* ═══════ Section 3 Colonnes ═══════ */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Séparateurs verticaux (desktop 3 colonnes) */}
            <div className="hidden lg:block absolute left-1/3 -top-10 bottom-0 w-px bg-[#8C1515]/40" />
            <div className="hidden lg:block absolute left-2/3 -top-10 bottom-0 w-px bg-[#8C1515]/40" />

            {/* Colonne 1 : L'établissement */}
            <div className="flex flex-col items-center">
              <h2 className="font-[var(--font-inter)] text-lg sm:text-xl font-bold text-[#8C1515] mb-6 sm:mb-8 uppercase tracking-wide text-center">
                L&apos;établissement
              </h2>
              <div className="space-y-5 sm:space-y-6 w-full">
                <article className="group border-b border-gray-200 pb-4 sm:pb-5">
                  <p className="text-xs text-gray-500 mb-2 font-[var(--font-inter)] uppercase tracking-wide">OGEC</p>
                  <p className="text-sm sm:text-base font-[var(--font-inter)] text-gray-700 leading-relaxed">
                    L&apos;OGEC assure la gestion économique, sociale et immobilière de l&apos;établissement pour offrir aux élèves et aux équipes un cadre de travail optimal.
                  </p>
                </article>
                <article className="group border-b border-gray-200 pb-4 sm:pb-5">
                  <p className="text-xs text-gray-500 mb-2 font-[var(--font-inter)] uppercase tracking-wide">APEL</p>
                  <p className="text-sm sm:text-base font-[var(--font-inter)] text-gray-700 leading-relaxed">
                    <Link
                      href="https://www.facebook.com/apel.lesrecollets/?locale=fr_FR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8C1515] underline underline-offset-2 decoration-2 font-bold hover:text-[#a01919] transition-colors"
                    >
                      L&apos;APEL
                    </Link>{' '}
                    représente l&apos;ensemble des familles auprès de la direction et dynamise la vie de l&apos;école à travers ses actions et événements.
                  </p>
                </article>
              </div>
            </div>

            {/* Colonne 2 : Événements */}
            <div className="flex flex-col items-center">
              <h2 className="font-[var(--font-inter)] text-lg sm:text-xl font-bold text-[#8C1515] mb-6 sm:mb-8 uppercase tracking-wide text-center">
                Événements
              </h2>
              <div className="space-y-5 sm:space-y-6 w-full">
                {sortedEvents.map((event, index) => {
                  const { day, month } = formatEventDate(event.date);
                  return (
                    <div
                      key={index}
                      className="flex gap-4 sm:gap-5 border-b border-gray-200 pb-4 sm:pb-5 -mx-2 px-2 rounded"
                    >
                      <div className="flex-shrink-0 text-center flex flex-col justify-center min-w-[48px]">
                        <div className="font-[var(--font-inter)] text-3xl sm:text-4xl font-bold text-[#8C1515] leading-none">
                          {day}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-600 font-[var(--font-inter)] uppercase mt-1 tracking-wide">
                          {month}
                        </div>
                      </div>
                      <div className="flex-1 flex items-center">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                          {event.titre}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Colonne 3 : Liens rapides */}
            <div className="flex flex-col items-center md:col-span-2 lg:col-span-1">
              <h2 className="font-[var(--font-inter)] text-lg sm:text-xl font-bold text-[#8C1515] mb-6 sm:mb-8 uppercase tracking-wide text-center">
                Liens Rapides
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-3 sm:gap-4 w-full">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm sm:text-base text-[#006CB8] hover:text-[#8C1515] transition-colors font-medium border-b border-gray-200 pb-2 sm:pb-3 lg:border-b lg:pb-3"
                    suppressHydrationWarning
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Contacts déroulant */}
                <div className="relative col-span-2 md:col-span-4 lg:col-span-1">
                  <button
                    type="button"
                    onClick={() => setContactsOpen(!contactsOpen)}
                    onBlur={() => setTimeout(() => setContactsOpen(false), 150)}
                    className="w-full flex items-center justify-between text-sm sm:text-base text-[#006CB8] hover:text-[#8C1515] transition-colors font-medium border-b border-gray-200 pb-2 sm:pb-3 lg:border-b lg:pb-3 text-left"
                    aria-expanded={contactsOpen}
                    aria-haspopup="true"
                  >
                    Contacts
                    <ChevronDown size={16} className={`flex-shrink-0 transition-transform ${contactsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {contactsOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                      {CONTACT_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2 text-sm sm:text-base text-[#006CB8] hover:text-[#8C1515] hover:bg-gray-50 transition-colors"
                          onClick={() => setContactsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Bandeau défilant ═══════ */}
      <section ref={statsRef} className="banner-rouge py-6 sm:py-8">
        <div className="overflow-hidden relative w-full">
          <div className="flex animate-scroll-banner-infinite" style={{ width: 'max-content' }}>
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex items-center px-8 whitespace-nowrap flex-shrink-0">
                <p
                  className="font-[var(--font-playfair)] text-center font-semibold whitespace-nowrap"
                  style={{ fontSize: 'clamp(0.875rem, 2.5vw, 2rem)', lineHeight: '1.2' }}
                >
                  L&apos;ensemble scolaire privé des Récollets : Offrir à votre enfant le privilège d&apos;un cadre exigeant pour une scolarité d&apos;exception.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Bienvenue et Galerie ═══════ */}
      <section className="bg-white py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Texte de bienvenue */}
          <div className="mb-10 sm:mb-12 lg:mb-16">
            <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8C1515] mb-6 sm:mb-8 text-center leading-tight">
              Bienvenue à l&apos;Ensemble Scolaire Privé des Récollets
            </h2>

            <div
              ref={welcomeTextRef}
              className={`max-w-4xl mx-auto space-y-4 sm:space-y-6 text-gray-800 leading-relaxed ${!showMoreWelcome && needsShowMoreWelcome ? 'line-clamp-[5]' : ''}`}
            >
              <p className="font-[var(--font-inter)] text-sm sm:text-base">
                L&apos;École Notre-Dame, le Collège, le Lycée Général et Technologique et le Lycée Professionnel Notre-Dame forment l&apos;Ensemble Scolaire Privé Catholique des Récollets. Il a pour vocation d&apos;accueillir des garçons et des filles de toutes origines, sans aucune distinction, et pour ambition de les aider à grandir en humanité sans réduire chaque jeune à ses seuls résultats scolaires, aussi excellents soient-ils.
              </p>
              <p className="font-[var(--font-inter)] text-sm sm:text-base">
                Être à l&apos;écoute de chacun, l&apos;aider à prendre confiance en lui en découvrant ses potentialités, l&apos;encourager à travailler à la hauteur de celles-ci et, sans tomber dans le manichéisme, lui faire prendre conscience que tout ne se vaut pas : le savoir-être est le signe d&apos;une intégration réussie, et non pas seulement des repères dont on parle tant.
              </p>
              <p className="font-[var(--font-inter)] text-sm sm:text-base">
                Vaste programme, certes exigeant — la vertu de l&apos;exemple pour tous les membres de notre communauté éducative — mais ô combien exaltant !
              </p>
              <p className="font-[var(--font-inter)] text-sm sm:text-base">
                L&apos;École se doit de former les citoyens de demain ; nous sommes partie prenante de cette mission confiée au système éducatif, sans oublier, en tant qu&apos;établissement catholique d&apos;enseignement, de faire découvrir à tous les jeunes qui nous sont confiés le visage de l&apos;autre à travers la diversité des visages rencontrés.
              </p>
              <p className="font-[var(--font-playfair)] text-base sm:text-lg lg:text-xl text-[#8C1515] text-right mt-6 sm:mt-8 italic">
                M. FRATINI
              </p>
            </div>

            {needsShowMoreWelcome && (
              <div className="max-w-4xl mx-auto mt-4">
                <button
                  type="button"
                  onClick={toggleShowMoreWelcome}
                  className="text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1"
                >
                  {showMoreWelcome ? "Voir moins" : "Voir plus"}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${showMoreWelcome ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Galerie photo auto-défilante */}
          <div className="overflow-hidden relative -mx-4 sm:mx-0">
            <div className="flex animate-scroll-horizontal gap-3 sm:gap-4 w-max">
              {galleryItems.map((image, i) => (
                <div key={`gallery-${i}`} className="flex-shrink-0">
                  <NextImage
                    src={image.src}
                    alt={image.alt}
                    width={280}
                    height={280}
                    className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] object-cover rounded-lg shadow-lg"
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
