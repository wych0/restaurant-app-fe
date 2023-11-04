import { PersonalData } from './personalData.model';

export interface Reservation {
  id: string;
  date: Date;
  hour: string;
  table: number;
  status: string;
  requests?: string;
  additionalOptions?: AdditionalOptions;
  personalData: PersonalData;
  peopleNumber: number;
}

export type CreateReservation = Omit<Reservation, 'id' | 'table' | 'status'>;

export interface AvailableHoursParams {
  date: Date;
  peopleNumber: number;
}

export interface AdditionalOptions {
  wheelchair?: boolean;
  baby?: boolean;
  cake?: boolean;
}
