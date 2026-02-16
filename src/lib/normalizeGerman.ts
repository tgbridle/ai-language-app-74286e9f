/**
 * Normalizes German text by replacing umlauts and ß with ASCII equivalents,
 * then lowercasing. Useful for accent-insensitive search.
 */
export function normalizeGerman(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss');
}
