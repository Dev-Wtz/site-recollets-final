"use client";

import { useEffect, useRef, useState } from "react";

interface AutoPlayVideoProps {
  src: string;
  title: string;
  className?: string;
}

export default function AutoPlayVideo({ src, title, className }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasUserPaused, setHasUserPaused] = useState(false);
  const [needsUnmute, setNeedsUnmute] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let observer: IntersectionObserver | null = null;

    const tryPlay = async (withSound: boolean) => {
      if (!video) return;

      video.muted = !withSound;
      video.volume = 1;

      try {
        await video.play();
        setNeedsUnmute(false);
      } catch {
        // Autoplay avec son souvent bloqué. On fallback en muet.
        if (withSound) {
          video.muted = true;
          try {
            await video.play();
            setNeedsUnmute(true);
          } catch {
            // Si même en muet c'est bloqué, on laisse les contrôles.
          }
        }
      }
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (!entry || !video) return;

      if (entry.isIntersecting && !hasUserPaused) {
        // Tentative autoplay AVEC son (si autorisé). Fallback en muet sinon.
        void tryPlay(true);
      } else if (!entry.isIntersecting) {
        video.pause();
      }
    };

    observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    observer.observe(video);

    const restartAndMaybePlay = () => {
      if (!video) return;
      video.currentTime = 0;
      if (!hasUserPaused) void tryPlay(true);
    };

    // Revenir sur la page (bfcache/back-forward) => on redémarre la vidéo.
    window.addEventListener("pageshow", restartAndMaybePlay);

    return () => {
      if (observer && video) {
        observer.unobserve(video);
      }
      observer = null;
      window.removeEventListener("pageshow", restartAndMaybePlay);
    };
  }, [hasUserPaused]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className={className}
        src={src}
        playsInline
        controls
        preload="metadata"
        aria-label={title}
        onPause={() => setHasUserPaused(true)}
        onPlay={() => setHasUserPaused(false)}
        onLoadedMetadata={() => {
          const v = videoRef.current;
          if (!v) return;
          v.currentTime = 0;
        }}
      />

      {needsUnmute && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center px-3 pointer-events-none">
          <button
            type="button"
            className="pointer-events-auto bg-white/90 backdrop-blur-sm text-gray-900 border border-gray-200 shadow-lg rounded-full px-4 py-2 text-sm font-semibold"
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.muted = false;
              v.volume = 1;
              void v.play();
              setNeedsUnmute(false);
            }}
          >
            Activer le son
          </button>
        </div>
      )}
    </div>
  );
}

