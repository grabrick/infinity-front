export const convertMongoDate = (date: string) =>
  new Date(date).toLocaleDateString('ru-RU', { timeZone: 'UTC' });