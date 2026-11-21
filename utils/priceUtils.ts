export function parsePrice(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, '');
  return Number(cleaned);
}