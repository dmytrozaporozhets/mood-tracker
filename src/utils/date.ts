import { i18n } from './i18n/i18n';

const monthKeys = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]; // month keys for translation

/**
 * Formats a date into "16 June 2025 at 15:42" with translated month.
 */
export const formatDate = (input: string | Date): string => {
  const date = typeof input === 'string' ? new Date(input) : input;

  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const monthKey = monthKeys[date.getMonth()];
  const translatedMonth = i18n.t(`months.${monthKey}`);
  const at = i18n.t('meta.at'); // e.g. "at", "o", etc.

  return `${day} ${translatedMonth} ${year} ${at} ${hours}:${minutes}`;
};

interface HasDate {
  date: string; // ISO date string field
}

/**
 * Sorts array of objects by date descending (newest first).
 */
export const sortByDateDesc = <T extends HasDate>(list: T[]): T[] => {
  return [...list].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

/**
 * Returns today's date as YYYY-MM-DD string.
 */
export const formatDateToYYYYMMDD = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
};

export const safeParseDate = (value?: string): string => {
  if (!value) return '—';
  const timestamp = Number(value);
  const date = isNaN(timestamp) ? new Date(value) : new Date(timestamp);
  return isNaN(date.getTime()) ? '—' : formatDateToYYYYMMDD(date);
};

