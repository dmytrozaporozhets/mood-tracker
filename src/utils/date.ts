import { i18n } from './i18n/i18n';

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);

  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const monthKeys = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  const monthKey = monthKeys[date.getMonth()];
  const translatedMonth = i18n.t(`months.${monthKey}`);

  const at = i18n.t('meta.at'); // optional translation for "at"

  return `${day} ${translatedMonth} ${year} ${at} ${hours}:${minutes}`;
};


interface HasDate {
  date: string;
}

export const sortByDateDesc = <T extends HasDate>(list: T[]): T[] => {
  return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};
