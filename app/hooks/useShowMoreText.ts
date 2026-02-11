"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Détecte si un bloc de texte dépasse un nombre de lignes et expose un état
 * pour afficher/masquer le contenu (bouton "Voir plus" / "Voir moins").
 */
export function useShowMoreText(maxLines = 8): {
  ref: React.RefObject<HTMLDivElement | null>;
  expanded: boolean;
  needsShowMore: boolean;
  toggle: () => void;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);

  const checkHeight = useCallback(() => {
    if (!ref.current) return;
    const lineHeight =
      parseFloat(getComputedStyle(ref.current).lineHeight) || 28;
    setNeedsShowMore(ref.current.scrollHeight > lineHeight * maxLines);
  }, [maxLines]);

  useEffect(() => {
    const timer = setTimeout(checkHeight, 100);
    window.addEventListener("resize", checkHeight, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkHeight);
    };
  }, [checkHeight]);

  const toggle = useCallback(() => setExpanded((prev) => !prev), []);

  return { ref, expanded, needsShowMore, toggle };
}
