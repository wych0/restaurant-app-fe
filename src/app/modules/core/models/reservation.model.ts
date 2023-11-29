import { PersonalData } from './personalData.model';

export interface Reservation {
  id: string;
  date: Date;
  hour: string;
  duration: number;
  table: number;
  status: string;
  requests?: string;
  additionalOptions?: AdditionalOptions;
  personalData: PersonalData;
  peopleNumber: number;
  userId?: string;
  isCancellable: boolean;
  canComplete: boolean;
  completedBy?: string;
  cancelledBy?: string;
}

export interface UserReservation {
  id: string;
  date: Date;
  status: string;
  hour: string;
  duration: number;
}

export interface ReservationDetails {
  id: string;
  date: Date;
  status: string;
  hour: string;
  duration: number;
  peopleNumber: number;
  tableNumber: number;
  personalData: PersonalData;
  additionalOptions: AdditionalOptions;
  requests: string;
  cancellationReason?: string;
  isCancellable: boolean;
}

export interface GetReservationsResponse {
  reservations: Reservation[];
  totalCount: number;
}

export interface GetUserReservationsResponse {
  reservations: UserReservation[];
  totalCount: number;
}

export interface GetReservationsParams {
  sort: string;
  dir: string;
  page: number;
  size: number;
  status?: string;
  term?: string;
  date?: string;
}

export interface CreateReservationResponse {
  date: Date;
  hour: string;
  peopleNumber: number;
  tableNumber: number;
  personalData: PersonalData;
}

export type CreateReservation = Omit<
  Reservation,
  'id' | 'table' | 'status' | 'isCancellable' | 'canComplete'
>;

export interface CancelReservation {
  reason: string;
}

export interface AvailableHoursParams {
  date: Date;
  peopleNumber: number;
  duration: number;
}

export interface AdditionalOptions {
  wheelchair?: boolean;
  baby?: boolean;
  cake?: boolean;
}

export interface MessageResponse {
  message: string;
}
