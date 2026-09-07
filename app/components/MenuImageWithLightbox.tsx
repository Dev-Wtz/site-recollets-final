"use client";

import { memo, useEffect, useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCw, Download, Maximize2, Calendar, Info } from "lucide-react";
import clsx from "clsx";

interface MenuImageWithLightboxProps {
  src: string;
  alt: string;
  title?: string;
  downloadName?: string;
  orientation?: "landscape" | "portrait";
}

function MenuImageWithLightbox({
  src,
  alt,
  title = "Menu de la semaine",
  downloadName,
  orientation = "landscape",
}: MenuImageWithLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!lightboxOpen) {
      setZoomLevel(1);
      setRotation(0);
      return;
    }
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

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 3.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.7));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const fileName = downloadName || src.split("/").pop() || "menu.jpg";

  return (
    <div className="w-full max-w-5xl mx-auto my-6">
      {/* Top Bar / Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-[#8C1515] to-[#A31C1C] text-white p-4 rounded-t-2xl shadow-md gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-300 shrink-0" />
          <h3 className="font-semibold text-base sm:text-lg font-[var(--font-inter)] tracking-wide">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95"
            title="Agrandir en plein écran"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Plein écran</span>
          </button>

          <a
            href={src}
            download={fileName}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-[#8C1515] rounded-lg text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95"
            title="Télécharger l'image du menu"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger JPG</span>
          </a>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative bg-neutral-950 border-x border-b border-gray-200 rounded-b-2xl overflow-hidden shadow-xl group">
        <div
          onClick={() => setLightboxOpen(true)}
          className="cursor-zoom-in relative flex items-center justify-center p-2 sm:p-4 min-h-[320px] sm:min-h-[480px]"
        >
          {/* Menu Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={clsx(
              "w-auto h-auto max-h-[75vh] object-contain transition-all duration-300 rounded shadow-md group-hover:scale-[1.01]",
              orientation === "landscape" ? "max-w-full" : "max-w-[90%] sm:max-w-[650px]"
            )}
            loading="eager"
            decoding="async"
          />

          {/* Hover Overlay Badge */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-95 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white text-xs sm:text-sm font-medium shadow-lg">
              <ZoomIn className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Cliquez ou touchez l&apos;image pour l&apos;agrandir en HD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Info Box */}
      <div className="mt-3 flex items-start gap-2.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200">
        <Info className="w-4 h-4 text-[#8C1515] shrink-0 mt-0.5" />
        <span>
          <strong>Mise à jour hebdomadaire :</strong> Pour mettre à jour ce menu la semaine prochaine, remplacez simplement le fichier <code className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-800 font-mono font-semibold">{src}</code> dans le dossier <code className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-800 font-mono font-semibold">/public/menus/</code>.
        </span>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-md select-none animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          {/* Lightbox Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-white/10 text-white z-20">
            <div className="flex items-center gap-2 truncate max-w-[45%] sm:max-w-[60%]">
              <span className="font-semibold text-xs sm:text-base truncate">{title}</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Zoomer (+)"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={handleZoomOut}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Dézoomer (-)"
              >
                <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={handleRotate}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Pivoter (90°)"
              >
                <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {(zoomLevel !== 1 || rotation !== 0) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold hover:bg-amber-500/30 transition-colors"
                >
                  Reset
                </button>
              )}

              <a
                href={src}
                download={fileName}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-amber-400 text-[#8C1515] rounded-lg text-xs font-bold hover:bg-amber-300 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger</span>
              </a>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 ml-1 sm:ml-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-white transition-colors shadow-md"
                title="Fermer"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Lightbox Stage */}
          <div
            className="relative flex-1 overflow-auto flex items-center justify-center p-4 cursor-grab active:cursor-grabbing"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="transition-transform duration-200 flex items-center justify-center"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-w-[95vw] max-h-[85vh] object-contain shadow-2xl rounded"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(MenuImageWithLightbox);

