export function formatPrice(amount: number): string {
  return `£${amount.toFixed(2)}`;

  
}

export function parsePrice(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, '');
  return Number(cleaned);
}

