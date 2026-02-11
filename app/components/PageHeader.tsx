import OptimizedImage from "./OptimizedImage";
import { memo } from "react";

interface PageHeaderProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
}

function PageHeader({ title, imageSrc, imageAlt }: PageHeaderProps) {
  return (
    <>
      {/* Titre */}
      <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
        <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8C1515] mb-4">
          {title}
        </h1>
        <div className="w-24 h-1 bg-[#8C1515] mx-auto" />
      </div>

      {/* Image Hero */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <div className="relative w-full h-40 sm:h-52 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-2xl">
          <OptimizedImage
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}

export default memo(PageHeader);
