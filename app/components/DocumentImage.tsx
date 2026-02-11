import NextImage from "next/image";
import { memo } from "react";

interface DocumentImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Composant optimisé pour afficher des documents (menus, calendriers, tarifs, etc.)
 * Utilise Next/Image avec des paramètres cohérents
 */
function DocumentImage({ 
  src, 
  alt, 
  className = "w-full max-w-6xl h-auto rounded-lg shadow-2xl",
  priority = false 
}: DocumentImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={1200}
      height={1600}
      className={className}
      quality={85}
      loading={priority ? undefined : "lazy"}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
    />
  );
}

export default memo(DocumentImage);
