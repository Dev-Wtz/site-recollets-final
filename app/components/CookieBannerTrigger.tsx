"use client";

import { useCallback } from "react";
import { openCookieBanner } from "@/app/lib/cookieConsent";

/**
 * Bouton/lien "Gérer les cookies" pour rouvrir la bannière de consentement (conforme CNIL).
 */
interface CookieBannerTriggerProps {
  className?: string;
  asButton?: boolean;
  children?: React.ReactNode;
}

export default function CookieBannerTrigger({
  className,
  asButton = false,
  children = "Gérer les cookies",
}: CookieBannerTriggerProps) {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    openCookieBanner();
    const banner = document.getElementById("cookie-consent-banner");
    if (banner) {
      banner.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  if (asButton) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={className}
        aria-label="Rouvrir le bandeau de gestion des cookies"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${className ?? ""} cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit underline hover:no-underline`}
      aria-label="Rouvrir le bandeau de gestion des cookies"
    >
      {children}
    </button>
  );
}
