import { CONTAINER_CLASS, FOOTER } from "@/app/lib/constants";

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
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-[var(--font-inter)] text-xs font-bold mb-1.5 uppercase tracking-wide text-[#8C1515]">
              Contact
            </h3>
            <div className="font-[var(--font-inter)] text-xs text-gray-700 space-y-0.5 leading-snug">
              <p>
                <span className="text-gray-500">Tél :</span>{" "}
                <a
                  href={`tel:${FOOTER.phone}`}
                  className="hover:text-[#8C1515] transition-colors"
                >
                  {FOOTER.phoneDisplay}
                </a>
              </p>
              <p>
                <span className="text-gray-500">Mail :</span>{" "}
                <a
                  href={`mailto:${FOOTER.email}`}
                  className="hover:text-[#8C1515] transition-colors break-all"
                >
                  {FOOTER.email}
                </a>
              </p>
            </div>
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
