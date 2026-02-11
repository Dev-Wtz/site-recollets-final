"use client";

import { useEffect, useState, useCallback } from "react";
import { memo } from "react";

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
    setProgress(percent);
  }, []);

  useEffect(() => {
    updateProgress();
    
    let rafId: number;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updateProgress]);

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
