"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface MenuImageWithLightboxProps {
  src: string;
  alt: string;
  /** Afficher l'image tournée à 90° (menus horizontaux) */
  rotated?: boolean;
  width?: number;
  height?: number;
}

/**
 * Affiche le menu sans cadre : taille de l'écran (100 % largeur, hauteur adaptée).
 * Clic sur l'image ouvre une lightbox pour l'agrandir.
 */
export default function MenuImageWithLightbox({
  src,
  alt,
  rotated = false,
  width = 1600,
  height = 900,
}: MenuImageWithLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="block w-full flex justify-center focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2 cursor-zoom-in rounded-lg overflow-hidden"
        aria-label="Agrandir le menu"
      >
        <span
          className={`flex justify-center items-center w-full bg-gray-50/50 ${rotated ? "h-[100vh] overflow-x-auto overflow-y-hidden scroll-smooth" : "relative w-full h-[100vh] min-h-[640px]"}`}
        >
          {rotated ? (
            <NextImage
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="max-w-none h-full w-auto object-contain object-center rotate-90 select-none pointer-events-none flex-shrink-0"
              quality={90}
              sizes="100vw"
              loading="lazy"
              draggable={false}
              priority={false}
            />
          ) : (
            <NextImage
              src={src}
              alt={alt}
              fill
              className="object-contain object-center select-none pointer-events-none"
              quality={90}
              sizes="100vw"
              loading="lazy"
              draggable={false}
              priority={false}
            />
          )}
        </span>
      </button>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          role="dialog"
          aria-modal="true"
          aria-label="Menu agrandi"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Fermer"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
          <div
            className={`relative max-w-[95vw] max-h-[90vh] flex items-center justify-center ${rotated ? "rotate-90" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
}
