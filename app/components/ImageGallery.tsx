"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import NextImage from "next/image";
import { memo, useCallback, useEffect, useState } from "react";

interface ImageGalleryProps {
  images: string[];
  initialIndex?: number;
  title?: string;
  onClose: () => void;
  isOpen: boolean;
}

/**
 * Lightbox/galerie full-screen - Pattern utilisé par Le Monde, NY Times, Airbnb
 * - Clic image ou bouton "Images" ouvre cette galerie
 * - Navigation clavier (Échap, flèches)
 * - Compteur d'images
 * - Thumbnails en bas
 */
function ImageGallery({
  images,
  initialIndex = 0,
  title,
  onClose,
  isOpen,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, initialIndex, onClose, goNext, goPrev]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col bg-black/90 backdrop-blur-md cursor-zoom-out"
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie photo ${title || ""}`}
      onClick={onClose}
    >
      {/* Overlay : assombrit tout le site (clic ferme) */}

      {/* Croix pour quitter - en haut à droite */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Fermer"
      >
        <X size={28} strokeWidth={2.5} />
      </button>

      {/* Contenu principal : image grande + bande de navigation - clic ne ferme pas */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center p-4 md:p-6 pt-16 md:pt-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grande image centrale */}
        <div className="relative flex-1 w-full max-w-[90vw] max-h-[70vh] flex items-center justify-center min-h-[50vh]">
          <NextImage
            src={currentImage}
            alt={`${title || "Photo"} ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="90vw"
            quality={95}
            priority
            unoptimized={currentImage.startsWith("data:")}
          />
        </div>

        {/* Flèches de navigation à gauche et droite */}
        <button
          onClick={goPrev}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
          aria-label="Photo précédente"
        >
          <ChevronLeft size={40} strokeWidth={2.5} />
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
          aria-label="Photo suivante"
        >
          <ChevronRight size={40} strokeWidth={2.5} />
        </button>

        {/* Bande des petites images en dessous - style Microsoft Photos */}
        <div className="w-full max-w-4xl mt-6 pb-4">
          <p className="text-white/70 text-sm text-center mb-3 tabular-nums">
            {currentIndex + 1} / {images.length}
          </p>
          <div className="flex gap-2 justify-center overflow-x-auto pb-2">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  i === currentIndex
                    ? "border-white opacity-100 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]"
                }`}
                aria-label={`Photo ${i + 1}`}
              >
                <NextImage
                  src={src}
                  alt={`Photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  quality={50}
                  unoptimized={src.startsWith("data:")}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ImageGallery);
