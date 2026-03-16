"use client";

import { ChevronDown, Images } from "lucide-react";
import NextImage from "next/image";
import { memo, useCallback, useMemo, useState } from "react";
import ImageGallery from "./ImageGallery";

interface BlogArticleProps {
  id: number;
  titre: string;
  date?: string;
  image: string;
  images?: string[];
  texte: string;
  expanded?: boolean;
  onToggle?: () => void;
  category?: string;
}

/** Retourne true si le src est une image réelle (non vide, non placeholder) */
function isRealImage(src: string): boolean {
  if (typeof src !== "string" || !src.trim()) return false;
  if (src.startsWith("data:image/svg+xml")) return false;
  return true;
}

/**
 * Composant standardisé pour afficher un article de blog
 * - Image CARRÉE : 280x280px (identique à la galerie page d'accueil)
 * - Format compact et uniforme
 * - Date au format "JJ Mois AAAA" (ex: 12 Décembre 2025)
 * - Bouton Images (n) avec le nombre réel d'images ; pas d'images vides ni placeholders
 */
function BlogArticle({
  titre,
  date,
  image,
  images = [],
  texte,
  expanded = false,
  onToggle,
  category,
}: BlogArticleProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const MAX_CHARS = 180;
  const needsTruncation = texte.length > MAX_CHARS;

  const galleryImages = useMemo(() => {
    const main = isRealImage(image) ? [image] : [];
    const extra = (images || []).filter(isRealImage);
    return [...main, ...extra];
  }, [image, images]);

  const openGallery = useCallback(() => {
    setIsGalleryOpen(true);
  }, []);

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="md:flex md:h-[280px]">
        {/* Image - Cliquable pour ouvrir la galerie (si au moins une image réelle) */}
        <button
          type="button"
          onClick={galleryImages.length >= 1 ? openGallery : undefined}
          disabled={galleryImages.length === 0}
          className="relative w-full h-[200px] sm:h-[240px] md:w-[280px] md:h-[280px] md:flex-shrink-0 overflow-hidden bg-gray-100 rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2 disabled:cursor-default disabled:focus:ring-0"
          aria-label={galleryImages.length >= 1 ? `Voir les ${galleryImages.length} photo${galleryImages.length > 1 ? "s" : ""}` : undefined}
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
          {category && (
            <span className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm text-[#8C1515] font-[var(--font-inter)] font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-full shadow-sm pointer-events-none">
              {category}
            </span>
          )}
          {/* Overlay au survol - uniquement s'il y a des images à voir */}
          {galleryImages.length >= 1 && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-900 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                <Images size={18} />
                Images ({galleryImages.length})
              </span>
            </div>
          )}
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

          {/* Texte - Limité à 300 caractères */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <p className={`font-[var(--font-inter)] text-sm text-gray-700 leading-relaxed whitespace-pre-line ${expanded ? "overflow-y-auto flex-1 min-h-0" : ""}`}>
              {!expanded && needsTruncation ? `${texte.slice(0, MAX_CHARS).trimEnd()}…` : texte}
            </p>

            <div className="mt-2 flex flex-col items-start gap-2 shrink-0">
              {needsTruncation && onToggle && (
                <button
                  onClick={onToggle}
                  className="text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1"
                  aria-expanded={expanded}
                >
                  {expanded ? "Afficher moins" : "Afficher plus"}
                  <ChevronDown size={16} className={`transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
              )}
              {/* Bouton Images - en dessous de Tout voir ; affiche toujours le nombre réel d'images */}
              {galleryImages.length >= 1 && (
                <button
                  onClick={openGallery}
                  className="text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1.5"
                  aria-label={`Voir les ${galleryImages.length} photo${galleryImages.length > 1 ? "s" : ""}`}
                >
                  <Images size={18} />
                  Images ({galleryImages.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Galerie lightbox - uniquement s'il y a au moins une image réelle */}
      {isGalleryOpen && galleryImages.length >= 1 && (
        <ImageGallery
          images={galleryImages}
          title={titre}
          isOpen
          onClose={closeGallery}
        />
      )}
    </article>
  );
}

export default memo(BlogArticle);
