"use client";

import { Mail, Link2, MapPin, Phone } from "lucide-react";
import { memo, useEffect, useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { StructureContacts } from "@/app/lib/types";

interface ContactCardProps extends StructureContacts {
  /** Ex. "Vie scolaire de l'école", "Vie scolaire du collège" */
  vieScolaireLabel?: string;
  /** Afficher le bloc Vie scolaire (défaut: true). false = uniquement le secrétariat */
  showVieScolaire?: boolean;
  /** Adresse de l'établissement (si fournie, affiche un onglet "Adresse") */
  address?: string;
}

type TabKey = "contact" | "adresse";

function ContactCard({
  secretariat,
  vieScolaire,
  vieScolaireLabel = "Vie scolaire",
  showVieScolaire = true,
  address,
}: ContactCardProps) {
  const tabsId = useId();
  const hasAddress = Boolean(address && address.trim().length > 0);
  const [activeTab, setActiveTab] = useState<TabKey>("contact");
  const [showAdresseHint, setShowAdresseHint] = useState(true);

  const mapsHref = useMemo(() => {
    if (!hasAddress) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address!.trim())}`;
  }, [address, hasAddress]);

  useEffect(() => {
    if (!hasAddress) return;
    const t = window.setTimeout(() => setShowAdresseHint(false), 15000);
    return () => window.clearTimeout(t);
  }, [hasAddress]);

  return (
    <div className="bg-gray-50 rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200">
      {hasAddress ? (
        <div
          className="relative mb-3 inline-flex items-end gap-6"
          role="tablist"
          aria-label="Navigation contact et adresse"
        >
          <motion.button
            type="button"
            role="tab"
            id={`${tabsId}-tab-contact`}
            aria-selected={activeTab === "contact"}
            aria-controls={`${tabsId}-panel-contact`}
            onClick={() => setActiveTab("contact")}
            whileTap={{ scale: 0.98 }}
            className={`relative pb-2 font-[var(--font-playfair)] text-lg sm:text-xl font-bold tracking-wide transition-colors ${
              activeTab === "contact" ? "text-[#8C1515]" : "text-gray-900/70 hover:text-[#8C1515]"
            }`}
          >
            Contact
            {activeTab === "contact" && (
              <motion.span
                layoutId={`${tabsId}-underline`}
                className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#8C1515]"
                transition={{ type: "spring", stiffness: 700, damping: 45 }}
              />
            )}
          </motion.button>

          <motion.button
            type="button"
            role="tab"
            id={`${tabsId}-tab-adresse`}
            aria-selected={activeTab === "adresse"}
            aria-controls={`${tabsId}-panel-adresse`}
            onClick={() => setActiveTab("adresse")}
            whileTap={{ scale: 0.98 }}
            className={`relative pb-2 font-[var(--font-playfair)] text-lg sm:text-xl font-bold tracking-wide transition-colors ${
              activeTab === "adresse" ? "text-[#8C1515]" : "text-gray-900/70 hover:text-[#8C1515]"
            }`}
          >
            Adresse
            {activeTab !== "adresse" && showAdresseHint && (
              <motion.span
                aria-hidden="true"
                className="absolute -top-1 -right-1.5 h-2 w-2 rounded-full bg-[#8C1515]"
                initial={{ opacity: 0.2, scale: 1 }}
                animate={{ opacity: [0.25, 0.85, 0.25], scale: [1, 1.25, 1] }}
                transition={{ duration: 1.2, repeat: 3, ease: "easeInOut" }}
              />
            )}
            {activeTab === "adresse" && (
              <motion.span
                layoutId={`${tabsId}-underline`}
                className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#8C1515]"
                transition={{ type: "spring", stiffness: 700, damping: 45 }}
              />
            )}
          </motion.button>
        </div>
      ) : (
        <div className="mb-4">
          <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-bold text-[#8C1515]">
            Contact
          </h2>
        </div>
      )}

      <div className="mb-4 h-px w-full bg-gray-200/80" aria-hidden="true" />

      {(!hasAddress || activeTab === "contact") && (
        <div
          id={`${tabsId}-panel-contact`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-contact`}
          className="space-y-4 font-[var(--font-inter)] text-sm sm:text-base text-gray-700"
        >
          <div>
            <p className="font-semibold text-gray-900 mb-1">
              Secrétariat de l&apos;ensemble scolaire
            </p>
            <p className="flex items-center gap-2">
              <a
                href={`tel:${secretariat.phoneTel}`}
                className="inline-flex items-center gap-1.5 hover:text-[#8C1515] transition-colors underline-offset-2 hover:underline"
                aria-label="Appeler le secrétariat de l'ensemble scolaire"
              >
                <Phone size={16} className="flex-shrink-0" />
                {secretariat.phone}
                <Link2 size={14} className="flex-shrink-0 opacity-70" />
              </a>
            </p>
            <p className="flex items-center gap-2 mt-1">
              <a
                href={`mailto:${secretariat.email}`}
                className="inline-flex items-center gap-1.5 hover:text-[#8C1515] transition-colors break-all underline-offset-2 hover:underline"
                aria-label="Envoyer un email au secrétariat de l'ensemble scolaire"
              >
                <Mail size={16} className="flex-shrink-0" />
                {secretariat.email}
                <Link2 size={14} className="flex-shrink-0 opacity-70" />
              </a>
            </p>
          </div>

          {showVieScolaire && (
            <>
              <div className="h-px w-full bg-gray-200/80" aria-hidden="true" />
              <div>
              <p className="font-semibold text-gray-900 mb-1">{vieScolaireLabel}</p>
              <p className="flex items-center gap-2">
                <a
                  href={`tel:${vieScolaire.phoneTel}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#8C1515] transition-colors underline-offset-2 hover:underline"
                  aria-label={`Appeler la ${vieScolaireLabel.toLowerCase()}`}
                >
                  <Phone size={16} className="flex-shrink-0" />
                  {vieScolaire.phone}
                  <Link2 size={14} className="flex-shrink-0 opacity-70" />
                </a>
              </p>
              <p className="flex items-center gap-2 mt-1">
                <a
                  href={`mailto:${vieScolaire.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#8C1515] transition-colors break-all underline-offset-2 hover:underline"
                  aria-label={`Envoyer un email à la ${vieScolaireLabel.toLowerCase()}`}
                >
                  <Mail size={16} className="flex-shrink-0" />
                  {vieScolaire.email}
                  <Link2 size={14} className="flex-shrink-0 opacity-70" />
                </a>
              </p>
              </div>
            </>
          )}
        </div>
      )}

      {hasAddress && activeTab === "adresse" && (
        <div
          id={`${tabsId}-panel-adresse`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-adresse`}
          className="font-[var(--font-inter)] text-sm sm:text-base text-gray-700"
        >
          <p className="font-semibold text-gray-900 mb-2 inline-flex items-center gap-2">
            <MapPin size={16} className="flex-shrink-0" aria-hidden="true" />
            Adresse
          </p>
          <p className="text-gray-700">{address!.trim()}</p>
          {mapsHref && (
            <>
              <div className="mt-4 h-px w-full bg-gray-200/80" aria-hidden="true" />
              <p className="mt-3">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-[#8C1515] hover:text-[#a01919] transition-colors underline-offset-2 hover:underline"
              >
                Itinéraire sur Google Maps
                <Link2 size={14} className="flex-shrink-0 opacity-80" />
              </a>
            </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(ContactCard);
