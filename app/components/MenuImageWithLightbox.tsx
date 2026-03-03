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
 * Affiche le menu sans cadre : grand sur desktop, plus petit sur mobile.
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
        className="block w-full flex justify-center px-2 sm:px-4 focus:outline-none focus:ring-2 focus:ring-[#8C1515] focus:ring-offset-2 rounded-lg cursor-zoom-in"
        aria-label="Agrandir le menu"
      >
        <span
          className={`flex justify-center w-full ${rotated ? "h-[55vh] sm:h-[62vh] md:h-[72vh] overflow-x-auto overflow-y-hidden" : "max-w-[85%] sm:max-w-[92%] md:max-w-6xl"}`}
        >
          <NextImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={
              rotated
                ? "max-w-none h-full w-auto object-contain object-center rotate-90 select-none pointer-events-none"
                : "w-full h-auto object-contain object-center select-none pointer-events-none"
            }
            quality={90}
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 92vw, 1200px"
            loading="lazy"
            draggable={false}
          />
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
