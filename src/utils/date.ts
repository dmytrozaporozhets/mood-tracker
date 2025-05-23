export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface HasDate {
  date: string;
}

export const sortByDateDesc = <T extends HasDate>(list: T[]): T[] => {
  return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
