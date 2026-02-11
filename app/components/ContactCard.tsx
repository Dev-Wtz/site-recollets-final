import { Phone, Mail, Link2 } from "lucide-react";
import { memo } from "react";
import type { StructureContacts } from "@/app/lib/types";

interface ContactCardProps extends StructureContacts {}

function ContactCard({ secretariat, vieScolaire }: ContactCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200">
      <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-bold text-[#8C1515] mb-4">
        Contact
      </h2>
      <div className="space-y-4 font-[var(--font-inter)] text-sm sm:text-base text-gray-700">
        <div>
          <p className="font-semibold text-gray-900 mb-1">Secrétariat</p>
          <p className="flex items-center gap-2">
            <a 
              href={`tel:${secretariat.phoneTel}`} 
              className="inline-flex items-center gap-1.5 hover:text-[#8C1515] transition-colors underline-offset-2 hover:underline" 
              aria-label="Appeler le secrétariat"
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
              aria-label="Envoyer un email au secrétariat"
            >
              <Mail size={16} className="flex-shrink-0" />
              {secretariat.email}
              <Link2 size={14} className="flex-shrink-0 opacity-70" />
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900 mb-1">Vie scolaire</p>
          <p className="flex items-center gap-2">
            <a 
              href={`tel:${vieScolaire.phoneTel}`} 
              className="inline-flex items-center gap-1.5 hover:text-[#8C1515] transition-colors underline-offset-2 hover:underline" 
              aria-label="Appeler la vie scolaire"
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
              aria-label="Envoyer un email à la vie scolaire"
            >
              <Mail size={16} className="flex-shrink-0" />
              {vieScolaire.email}
              <Link2 size={14} className="flex-shrink-0 opacity-70" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(ContactCard);
