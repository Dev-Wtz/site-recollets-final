/**
 * Utilitaires pour la gestion des dates
 */

const MONTH_MAP: Record<string, number> = {
  janvier: 1,
  février: 2,
  mars: 3,
  avril: 4,
  mai: 5,
  juin: 6,
  juillet: 7,
  août: 8,
  septembre: 9,
  octobre: 10,
  novembre: 11,
  décembre: 12,
};

const MONTH_NAMES = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

/**
 * Formate une date au format "JJ Mois AAAA"
 * Exemples: "12 Décembre 2024", "01 Septembre 2024"
 */
export function formatDate(day: number, month: number, year: number): string {
  const dayStr = day.toString().padStart(2, "0");
  const monthName = MONTH_NAMES[month - 1];
  return `${dayStr} ${monthName} ${year}`;
}

/**
 * Parse une date depuis différents formats et retourne un objet Date
 */
export function parseDate(dateStr: string): Date {
  const currentYear = new Date().getFullYear();

  // Format "12 décembre" ou "12 décembre 2024"
  const matchDay = dateStr.match(/(\d+)(?:er)?\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)(?:\s+(\d{4}))?/i);
  if (matchDay) {
    const day = parseInt(matchDay[1]);
    const month = MONTH_MAP[matchDay[2].toLowerCase()];
    const year = matchDay[3] ? parseInt(matchDay[3]) : currentYear;
    return new Date(year, month - 1, day);
  }

  // Format "Décembre 2024"
  const matchMonth = dateStr.match(/(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/i);
  if (matchMonth) {
    const month = MONTH_MAP[matchMonth[1].toLowerCase()];
    const year = parseInt(matchMonth[2]);
    return new Date(year, month - 1, 1);
  }

  // Format "7 au 12 décembre"
  const matchRange = dateStr.match(/(\d+)\s+au\s+\d+\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i);
  if (matchRange) {
    const day = parseInt(matchRange[1]);
    const month = MONTH_MAP[matchRange[2].toLowerCase()];
    return new Date(currentYear, month - 1, day);
  }

  return new Date(0);
}

/**
 * Formate une date string au format standardisé "JJ Mois AAAA"
 */
export function formatDateString(dateStr: string): string {
  const date = parseDate(dateStr);
  if (date.getTime() === 0) return dateStr; // Retourne la string originale si parsing échoue
  
  return formatDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
}
