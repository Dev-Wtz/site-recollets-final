"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  COOKIE_CONSENT_SHOW_EVENT,
  getStoredConsent,
  setStoredConsent,
  clearConsent,
  type CookieConsentState,
} from "@/app/lib/cookieConsent";

const STORAGE_KEY = "lesrecollets-cookie-banner-closed";

/** Vérifie si la bannière a déjà été fermée (choix enregistré) lors de cette session, pour éviter flash */
function wasBannerClosedThisSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookieConsentState["consent"]>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const hideBanner = useCallback(() => {
    setIsVisible(false);
    setShowDetails(false);
  }, []);

  const acceptAll = useCallback(() => {
    setStoredConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
    sessionStorage.setItem(STORAGE_KEY, "1");
    hideBanner();
  }, [hideBanner]);

  const rejectAll = useCallback(() => {
    setStoredConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    sessionStorage.setItem(STORAGE_KEY, "1");
    hideBanner();
  }, [hideBanner]);

  const savePreferences = useCallback(() => {
    setStoredConsent(prefs);
    sessionStorage.setItem(STORAGE_KEY, "1");
    hideBanner();
  }, [prefs, hideBanner]);

  useEffect(() => {
    // Initialisation côté client uniquement pour éviter les erreurs d'hydratation (SSR)
    const consent = getStoredConsent();
    if (!consent && !wasBannerClosedThisSession()) {
      setIsVisible(true);
    }

    const handleShow = () => {
      clearConsent();
      sessionStorage.removeItem(STORAGE_KEY);
      setIsVisible(true);
      setShowDetails(false);
    };
    window.addEventListener(COOKIE_CONSENT_SHOW_EVENT, handleShow);
    return () => window.removeEventListener(COOKIE_CONSENT_SHOW_EVENT, handleShow);
  }, []);

  if (!isVisible) return null;

  const btnClass =
    "font-[var(--font-inter)] px-2.5 py-1.5 text-xs font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors";

  return (
    <div
      id="cookie-consent-banner"
      role="dialog"
      aria-label="Choix des cookies"
      className="fixed bottom-0 left-0 right-0 z-[100] px-3 py-2 sm:px-4 sm:py-2.5 bg-white border-t border-[#8C1515] shadow-[0_-2px_10px_rgba(0,0,0,0.08)] animate-fade-in"
    >
      <div className="max-w-[1400px] mx-auto">
        {!showDetails ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <p className="font-[var(--font-inter)] text-xs text-gray-700 order-2 sm:order-1">
              Cookies : nous utilisons des traceurs pour le site.{" "}
              <Link href="/legal/cookies" className="text-[#8C1515] font-medium underline underline-offset-1 hover:no-underline">
                En savoir plus
              </Link>
            </p>
            <div className="flex flex-wrap gap-2 order-1 sm:order-2 shrink-0">
              <button type="button" onClick={acceptAll} className={`${btnClass} bg-[#8C1515] text-white hover:bg-[#a01919] focus:ring-[#8C1515]`}>
                Tout accepter
              </button>
              <button type="button" onClick={rejectAll} className={`${btnClass} bg-white text-gray-700 border border-gray-400 hover:bg-gray-50 focus:ring-gray-400`}>
                Tout refuser
              </button>
              <button type="button" onClick={() => setShowDetails(true)} className={`${btnClass} text-gray-600 hover:text-gray-900 focus:ring-gray-400`}>
                Personnaliser
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <p className="font-[var(--font-inter)] text-xs font-semibold text-gray-900">Catégories :</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-[var(--font-inter)] text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <input type="checkbox" id="cookie-necessary" checked disabled className="rounded border-gray-300 text-[#8C1515] focus:ring-[#8C1515] w-3.5 h-3.5" />
                <label htmlFor="cookie-necessary">Nécessaires (obligatoires)</label>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" id="cookie-analytics" checked={prefs.analytics} onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))} className="rounded border-gray-300 text-[#8C1515] focus:ring-[#8C1515] w-3.5 h-3.5" />
                <label htmlFor="cookie-analytics">Analyse</label>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" id="cookie-marketing" checked={prefs.marketing} onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))} className="rounded border-gray-300 text-[#8C1515] focus:ring-[#8C1515] w-3.5 h-3.5" />
                <label htmlFor="cookie-marketing">Marketing</label>
              </li>
            </ul>
            <div className="flex gap-2">
              <button type="button" onClick={savePreferences} className={`${btnClass} bg-[#8C1515] text-white hover:bg-[#a01919] focus:ring-[#8C1515]`}>
                Enregistrer
              </button>
              <button type="button" onClick={() => setShowDetails(false)} className={`${btnClass} text-gray-600 hover:text-gray-900 focus:ring-gray-400`}>
                Retour
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
