export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const sortByDateDesc = (list) => {
  return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
};
