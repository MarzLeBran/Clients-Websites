export function formatPhone(e164: string): string {
  const digits = e164.replace(/\D/g, '').slice(-10);
  if (digits.length !== 10) return e164;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function telHref(e164: string): string {
  return `tel:${e164.replace(/[^\d+]/g, '')}`;
}

export function smsHref(e164: string): string {
  return `sms:${e164.replace(/[^\d+]/g, '')}`;
}

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function formatHours(hours: { day: string; open: string; close: string }[]): string[] {
  return [...hours]
    .sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day))
    .map((h) => `${h.day}: ${h.open} – ${h.close}`);
}

// Meta descriptions get silently truncated by Google past ~155 chars.
// Cuts at the last full word under the limit rather than mid-word.
export function truncateForMeta(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max - 1)}…`;
}
