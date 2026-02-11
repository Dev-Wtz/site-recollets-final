"use client";

import { ChevronDown, Images } from "lucide-react";
import NextImage from "next/image";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import ImageGallery from "./ImageGallery";
import { getPlaceholderImages } from "@/app/lib/placeholderImages";

interface BlogArticleProps {
  id: number;
  titre: string;
  date?: string;
  image: string;
  images?: string[];
  texte: string;
  expanded?: boolean;
  onToggle?: () => void;
}

/**
 * Composant standardisé pour afficher un article de blog
 * - Image CARRÉE : 280x280px (identique à la galerie page d'accueil)
 * - Format compact et uniforme
 * - Date au format "JJ Mois AAAA" (ex: 12 Décembre 2025)
 */
function BlogArticle({
  id,
  titre,
  date,
  image,
  images = [],
  texte,
  expanded = false,
  onToggle,
}: BlogArticleProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const galleryImages = images.length > 0 ? [image, ...images] : getPlaceholderImages(10);

  const openGallery = useCallback(() => {
    setIsGalleryOpen(true);
  }, []);

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  // Détecte si le texte déborde
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && !expanded) {
        const hasOverflow = textRef.current.scrollHeight > textRef.current.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();
    const timer = setTimeout(checkOverflow, 100);
    window.addEventListener('resize', checkOverflow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [expanded, texte]);

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="md:flex md:h-[280px]">
        {/* Image - Cliquable pour ouvrir la galerie */}
        <button
          type="button"
          onClick={openGallery}
          className="relative w-full h-[200px] sm:h-[240px] md:w-[280px] md:h-[280px] md:flex-shrink-0 overflow-hidden bg-gray-100 rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2"
          aria-label={`Voir les ${galleryImages.length} photo${galleryImages.length > 1 ? "s" : ""}`}
        >
          <NextImage
            src={image}
            alt={titre}
            width={280}
            height={280}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
            quality={75}
            priority={false}
          />
          {/* Overlay au survol */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-900 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
              <Images size={18} />
              {galleryImages.length} photo{galleryImages.length > 1 ? "s" : ""}
            </span>
          </div>
        </button>

        {/* Contenu - JAMAIS plus grand que l'image (max 280px) */}
        <div className="flex-1 p-4 sm:p-6 md:p-6 flex flex-col min-h-0 md:h-[280px] md:max-h-[280px]">
          {/* Date */}
          {date && (
            <div className="mb-1 shrink-0">
              <time className="text-xs text-gray-500 font-[var(--font-inter)] uppercase tracking-wide">
                {date}
              </time>
            </div>
          )}

          {/* Titre */}
          <h3 className="font-[var(--font-playfair)] text-lg sm:text-xl lg:text-2xl font-bold text-[#8C1515] mb-2 line-clamp-1 shrink-0">
            {titre}
          </h3>

          {/* Texte - Limité à la taille de la photo */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div
              ref={textRef}
              className={`font-[var(--font-inter)] text-sm text-gray-700 leading-relaxed ${!expanded ? "line-clamp-5" : "overflow-y-auto flex-1 min-h-0"}`}
            >
              {texte}
            </div>

            {/* Boutons - en bas à gauche, Tout voir au-dessus de Images */}
            <div className="mt-2 flex flex-col items-start gap-2 shrink-0">
              {/* Tout voir - UNIQUEMENT s'il y a plus de 5 lignes de texte */}
              {!expanded && isOverflowing && onToggle && (
                <button
                  onClick={onToggle}
                  className="text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1"
                  aria-expanded={false}
                >
                  Tout voir
                  <ChevronDown size={16} className="transition-transform" aria-hidden="true" />
                </button>
              )}
              {expanded && onToggle && (
                <button
                  onClick={onToggle}
                  className="text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1"
                  aria-expanded={true}
                >
                  Voir moins
                  <ChevronDown size={16} className="transition-transform rotate-180" aria-hidden="true" />
                </button>
              )}
              {/* Bouton Images - en dessous de Tout voir */}
              <button
                onClick={openGallery}
                className="text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1.5"
                aria-label={`Voir les ${galleryImages.length} photo${galleryImages.length > 1 ? "s" : ""}`}
              >
                <Images size={18} />
                Images{galleryImages.length > 1 ? ` (${galleryImages.length})` : ""}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Galerie lightbox */}
      <ImageGallery
        images={galleryImages}
        title={titre}
        isOpen={isGalleryOpen}
        onClose={closeGallery}
      />
    </article>
  );
}

export default memo(BlogArticle);
