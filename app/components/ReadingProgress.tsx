"use client";

import { memo } from "react";
import { useSyncExternalStore } from "react";

function getProgressSnapshot(): number {
  if (typeof window === "undefined") return 0;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return 0;
  return Math.min((scrollTop / docHeight) * 100, 100);
}

function subscribeToScroll(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  let rafId = 0;
  const notify = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(onStoreChange);
  };

  window.addEventListener("scroll", notify, { passive: true });
  window.addEventListener("resize", notify, { passive: true });

  return () => {
    window.removeEventListener("scroll", notify);
    window.removeEventListener("resize", notify);
    if (rafId) cancelAnimationFrame(rafId);
  };
}

function ReadingProgress() {
  const progress = useSyncExternalStore(subscribeToScroll, getProgressSnapshot, () => 0);

  return (
    <div
      className="fixed left-6 sm:left-8 top-1/2 z-[100] -translate-y-1/2 w-1 h-[min(60vh,400px)] pointer-events-none hidden sm:block"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression de lecture"
    >
      {/* Piste verticale */}
      <div className="absolute inset-0 rounded-full bg-gray-200/90" />
      {/* Bille qui descend avec le scroll */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#8C1515] shadow-md border-2 border-white"
        style={{ 
          top: `${progress}%`,
          transform: `translate(-50%, -50%) translateZ(0)`,
          willChange: 'top',
        }}
      />
    </div>
  );
}

export default memo(ReadingProgress);
