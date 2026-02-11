import { useEffect, useRef, useState } from 'react';

/**
 * Hook pour détecter si un texte déborde de son conteneur
 * Retourne true si le texte est tronqué (overflow)
 */
export function useTextOverflow() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        // Vérifie si le scrollHeight est supérieur au clientHeight
        const hasOverflow = ref.current.scrollHeight > ref.current.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    // Vérifie au montage et après un court délai (pour le rendu)
    checkOverflow();
    const timer = setTimeout(checkOverflow, 100);

    // Vérifie aussi au redimensionnement
    window.addEventListener('resize', checkOverflow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return { ref, isOverflowing };
}
