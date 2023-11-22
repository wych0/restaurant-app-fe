import { format } from 'date-fns';

export const toDateWithHour = (dateString: string, hour: string): string => {
  const date = new Date(dateString);
  const formattedDate = format(date, 'dd.MM.yyyy') + ` ${hour}`;
  return formattedDate;
};
