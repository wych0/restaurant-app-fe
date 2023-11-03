export interface Reservation {
  id: number;
  date: string;
  hour: string;
  table: number;
  status: string;
}

export interface AvailableHoursParams {
  date: Date;
  peopleNumber: number;
}
