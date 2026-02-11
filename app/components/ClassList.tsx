import { memo } from "react";

interface ClassListProps {
  classes: readonly string[];
}

function ClassList({ classes }: ClassListProps) {
  return (
    <div className="max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
      <div className="bg-gray-50 rounded-xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-200">
        <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#8C1515] mb-6 sm:mb-8">
          Liste des classes
        </h2>
        <ul className="space-y-4 font-[var(--font-inter)] text-gray-700">
          {classes.map((classe) => (
            <li key={classe} className="border-l-2 border-[#8C1515] pl-4 py-2.5 text-sm sm:text-base leading-relaxed">
              {classe}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default memo(ClassList);
