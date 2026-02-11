import { ExternalLink, Award } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

function QuickLinks() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
      <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#8C1515] mb-6 sm:mb-8 text-center">
        Liens utiles
      </h2>
      <div className="flex flex-wrap justify-center gap-6 w-full">
        <Link 
          href="/administration/tarif"
          className="bg-[#8C1515] text-white rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 shadow hover:bg-[#a01919] transition-colors flex items-center justify-between group"
        >
          <div>
            <h3 className="font-[var(--font-inter)] text-sm sm:text-base font-bold mb-0.5">Tarifs</h3>
            <p className="font-[var(--font-inter)] text-xs opacity-90">Consulter les tarifs</p>
          </div>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          href="/administration/taux-reussite"
          className="bg-[#8C1515] text-white rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 shadow hover:bg-[#a01919] transition-colors flex items-center justify-between group"
        >
          <div>
            <h3 className="font-[var(--font-inter)] text-sm sm:text-base font-bold mb-0.5 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Résultats
            </h3>
            <p className="font-[var(--font-inter)] text-xs opacity-90">Taux de réussite</p>
          </div>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default memo(QuickLinks);
