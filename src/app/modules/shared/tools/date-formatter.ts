import { format } from 'date-fns';

export const toDateWithHour = (dateString: string, hour: string): string => {
  const date = new Date(dateString);
  const formattedDate = format(date, 'dd.MM.yyyy') + ` ${hour}`;
  return formattedDate;
};

export const calculateEndHour = (hour: string, duration: number): string => {
  const endHour = parseInt(hour.split(':')[0]) + +duration;
  return `${endHour}:00`;
};
