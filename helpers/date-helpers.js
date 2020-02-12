import { DateTime } from 'luxon';

export const sortByDate = (array) => array.sort((a, b) => {
  const startA = DateTime.fromISO(a.start);
  const startB = DateTime.fromISO(b.start);
  if (startA < startB) {
    return -1;
  }
  if (startA > startB) {
    return 1;
  }
  return 0;
});

export const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
};
