import Link from "next/link";
import { CONTAINER_CLASS, FOOTER } from "@/app/lib/constants";
import CookieBannerTrigger from "@/app/components/CookieBannerTrigger";

const LEGAL_LINKS = [
  { href: "/legal/mentions-legales", label: "Mentions légales" },
  { href: "/legal/confidentialite", label: "Confidentialité" },
  { href: "/legal/cgu", label: "CGU" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/charte-ugc", label: "Charte UGC" },
  { href: "/legal/accessibilite", label: "Accessibilité" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-gray-50 via-gray-100 to-gray-300 border-t-4 border-[#8C1515]">
      <div className={`${CONTAINER_CLASS} py-4 sm:py-6`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <h3 className="font-[var(--font-inter)] text-xs font-bold mb-1.5 uppercase tracking-wide text-[#8C1515]">
              Adresse
            </h3>
            <p className="font-[var(--font-inter)] text-xs text-gray-700 leading-snug">
              {FOOTER.address}
              <br />
              {FOOTER.zipCity}
            </p>
          </div>
          <div>
            <h3 className="font-[var(--font-inter)] text-xs font-bold mb-1.5 uppercase tracking-wide text-[#8C1515]">
              Horaires d&apos;Ouverture
            </h3>
            <div className="font-[var(--font-inter)] text-xs text-gray-700 space-y-0.5 leading-snug">
              <p>{FOOTER.hours.week}</p>
              <p>{FOOTER.hours.wednesday}</p>
              <p>{FOOTER.hours.weekend}</p>
            </div>
          </div>
          <div>
            <h3 className="font-[var(--font-inter)] text-xs font-bold mb-1.5 uppercase tracking-wide text-[#8C1515]">
              Informations légales
            </h3>
            <nav className="font-[var(--font-inter)] text-xs text-gray-700 space-y-1 leading-snug" aria-label="Pages légales">
              {LEGAL_LINKS.map((link) => (
                <p key={link.href}>
                  <Link href={link.href} className="hover:text-[#8C1515] transition-colors">
                    {link.label}
                  </Link>
                </p>
              ))}
              <p>
                <CookieBannerTrigger className="hover:text-[#8C1515] transition-colors">
                  Gérer les cookies
                </CookieBannerTrigger>
              </p>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-400/50 py-2 px-4">
        <p className="text-center font-[var(--font-inter)] text-[10px] sm:text-xs text-gray-600">
          © {new Date().getFullYear()} Les Récollets - Ensemble Scolaire Privé.
          Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
