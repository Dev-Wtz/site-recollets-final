/**
 * Génère des URLs d'images placeholder : fond blanc avec chiffre centré
 * Utilisé pour tester la galerie avant d'ajouter les vraies photos
 */
export function getPlaceholderImageUrl(num: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#ffffff"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".35em" font-size="200" font-family="system-ui, sans-serif" font-weight="400" fill="#9ca3af">${num}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function getPlaceholderImages(count: number = 10): string[] {
  return Array.from({ length: count }, (_, i) => getPlaceholderImageUrl(i + 1));
}
