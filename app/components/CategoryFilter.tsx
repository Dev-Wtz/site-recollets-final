"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { SlidersHorizontal, Check } from "lucide-react";

const CATEGORIES = ["École", "Collège", "Lycée", "Lycée Professionnel"] as const;
export type Category = (typeof CATEGORIES)[number];

interface CategoryFilterProps {
  selected: Set<Category>;
  onChange: (next: Set<Category>) => void;
}

function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const allSelected = selected.size === CATEGORIES.length;

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const toggleCategory = useCallback(
    (cat: Category) => {
      const next = new Set(selected);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      onChange(next);
    },
    [selected, onChange],
  );

  const selectAll = useCallback(() => {
    onChange(new Set(CATEGORIES));
  }, [onChange]);

  const activeCount = selected.size;

  return (
    <div ref={ref} className="relative inline-flex justify-center w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 bg-white text-sm font-semibold font-[var(--font-inter)] text-gray-700 shadow-sm hover:border-[#8C1515] hover:text-[#8C1515] transition-all duration-200"
      >
        <SlidersHorizontal size={16} />
        Filtrer
        {!allSelected && (
          <span className="ml-0.5 inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-[#8C1515] text-[11px] font-bold text-white leading-none">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full mt-2 z-30 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fade-in">
          <button
            type="button"
            onClick={selectAll}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-[var(--font-inter)] transition-colors ${
              allSelected
                ? "text-[#8C1515] font-semibold bg-red-50/60"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Tous les établissements
            {allSelected && <Check size={16} strokeWidth={2.5} className="text-[#8C1515]" />}
          </button>
          <div className="mx-3 my-1 h-px bg-gray-200" />
          {CATEGORIES.map((cat) => {
            const active = selected.has(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-[var(--font-inter)] transition-colors ${
                  active
                    ? "text-[#8C1515] font-semibold bg-red-50/60"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                aria-pressed={active}
              >
                {cat}
                {active && <Check size={16} strokeWidth={2.5} className="text-[#8C1515]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { CATEGORIES };
export default memo(CategoryFilter);
