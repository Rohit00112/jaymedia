import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes with clsx */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date string */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

/** Truncate text to a max length */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/** Strip a phone number to digits, removing a leading Nepal country code. */
function nepalLocalDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  return digits.startsWith('977') && digits.length > 10
    ? digits.slice(3)
    : digits;
}

/** Display a Nepal phone number in international format, e.g. "+977 9851143338". */
export function formatPhoneIntl(raw: string): string {
  if (!raw) return '';
  return `+977 ${nepalLocalDigits(raw)}`;
}

/** `tel:` href in E.164 format, e.g. "tel:+9779851143338". */
export function phoneTelHref(raw: string): string {
  return `tel:+977${nepalLocalDigits(raw)}`;
}

/** Digits-only number for wa.me links, e.g. "9779851143338". */
export function phoneWhatsAppNumber(raw: string): string {
  return `977${nepalLocalDigits(raw)}`;
}

/** Generate a URL-safe slug from text */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Check if reduced motion is preferred (client-side only) */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Debounce a function */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

