/**
 * Gestion du consentement cookies – conforme RGPD / CNIL.
 * Clé et format stockés en localStorage.
 */

export const COOKIE_CONSENT_KEY = "lesrecollets-cookie-consent";

export type CookieCategory = "necessary" | "analytics" | "marketing";

export interface CookieConsentState {
  /** Date d'enregistrement du choix (ISO string) */
  date: string;
  /** Version de la politique cookies (pour invalider si on change les catégories) */
  version: number;
  consent: {
    necessary: boolean; // toujours true
    analytics: boolean;
    marketing: boolean;
  };
}

const CURRENT_VERSION = 1;

const defaultConsent: CookieConsentState["consent"] = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function getStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (parsed.version !== CURRENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setStoredConsent(consent: CookieConsentState["consent"]): void {
  if (typeof window === "undefined") return;
  const state: CookieConsentState = {
    date: new Date().toISOString(),
    version: CURRENT_VERSION,
    consent: { ...consent, necessary: true },
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
}

export function hasValidConsent(): boolean {
  return getStoredConsent() !== null;
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
}

/** Événement personnalisé pour rouvrir la bannière (ex. depuis "Gérer les cookies") */
export const COOKIE_CONSENT_SHOW_EVENT = "lesrecollets-cookie-consent-show";

export function openCookieBanner(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_SHOW_EVENT));
}

export const defaultConsentState = defaultConsent;
