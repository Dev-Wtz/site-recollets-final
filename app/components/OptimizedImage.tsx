import NextImage, { ImageProps } from "next/image";
import { memo } from "react";

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  priority?: boolean;
}

/**
 * Composant Image optimisé avec des paramètres par défaut performants
 */
function OptimizedImage({ 
  src, 
  alt, 
  priority = false,
  quality = 75,
  loading = priority ? undefined : "lazy",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px",
  ...props 
}: OptimizedImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      quality={quality}
      loading={loading}
      sizes={sizes}
      priority={priority}
      {...props}
    />
  );
}

export default memo(OptimizedImage);
