"use client";

import { ChevronDown } from "lucide-react";
import { useShowMoreText } from "@/app/hooks/useShowMoreText";
import { memo, ReactNode } from "react";

interface DescriptionSectionProps {
  title: string;
  children: ReactNode;
  maxLines?: number;
}

function DescriptionSection({ title, children, maxLines = 8 }: DescriptionSectionProps) {
  const { ref, expanded, needsShowMore, toggle } = useShowMoreText(maxLines);

  return (
    <div className="max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
        <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#8C1515] mb-4 sm:mb-6">
          {title}
        </h2>
        <div 
          ref={ref}
          className={`space-y-4 text-gray-700 ${!expanded && needsShowMore ? 'line-clamp-[5]' : ''}`}
        >
          {children}
        </div>
        {needsShowMore && (
          <button
            type="button"
            onClick={toggle}
            className="mt-4 text-[#8C1515] hover:text-[#a01919] font-[var(--font-inter)] font-semibold text-sm transition-colors flex items-center gap-1"
          >
            {expanded ? "Voir moins" : "Voir plus"}
            <ChevronDown
              size={16}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(DescriptionSection);
