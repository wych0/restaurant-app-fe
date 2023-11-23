import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AvailableHoursParams,
  CreateReservation,
  CreateReservationResponse,
  GetReservationsParams,
  GetReservationsResponse,
  MessageResponse,
  ReservationDetails,
} from '../models/reservation.model';

import { environment } from 'src/environments/environment.development';

type Hour = string;

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/reservation`;
  private reservationCreated = new BehaviorSubject<boolean>(false);
  reservationCreated$: Observable<boolean> =
    this.reservationCreated.asObservable();

  constructor(private http: HttpClient) {}

  setReservationCreated(): void {
    this.reservationCreated.next(true);
  }

  add(body: CreateReservation): Observable<CreateReservationResponse> {
    return this.http.post<CreateReservationResponse>(this.apiUrl, body);
  }

  confirm(token: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.apiUrl}/confirm/${token}`,
      {}
    );
  }

  cancel(id: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/cancel/${id}`, {});
  }

  complete(id: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/complete/${id}`, {});
  }

  getAll(
    paramsObject: GetReservationsParams
  ): Observable<GetReservationsResponse> {
    let params = new HttpParams({
      fromObject: {
        page: paramsObject.page,
        size: paramsObject.size,
      },
    });
    if (paramsObject.sort) {
      params = params
        .append('sort', paramsObject.sort)
        .append('dir', paramsObject.dir);
    }
    if (paramsObject.status) {
      params = params.append('status', paramsObject.status);
    }
    if (paramsObject.term) {
      params = params.append('term', paramsObject.term);
    }
    if (paramsObject.date) {
      params = params.append('date', paramsObject.date);
    }

    return this.http.get<GetReservationsResponse>(`${this.apiUrl}`, {
      params,
    });
  }

  getReservationDetails(id: string): Observable<ReservationDetails> {
    return this.http.get<ReservationDetails>(`${this.apiUrl}/${id}`);
  }

  getAvailableHours(paramsObject: AvailableHoursParams): Observable<Hour[]> {
    const params = new HttpParams({
      fromObject: {
        date: paramsObject.date.toString(),
        peopleNumber: paramsObject.peopleNumber.toString(),
      },
    });
    return this.http.get<Hour[]>(`${this.apiUrl}/availableHours`, {
      params,
    });
  }
}
