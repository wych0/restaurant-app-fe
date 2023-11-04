import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AvailableHoursParams,
  CreateReservation,
} from '../models/reservation.model';

import { environment } from 'src/environments/environment.development';

type Hour = string;
type CreateReservationResponse = string;

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/reservation`;
  constructor(private http: HttpClient) {}

  addReservation(
    reservation: CreateReservation
  ): Observable<CreateReservationResponse> {
    return this.http.post<CreateReservationResponse>(this.apiUrl, reservation);
  }

  getAvailableHours(params: AvailableHoursParams): Observable<Hour[]> {
    const httpParams = new HttpParams({
      fromObject: {
        date: params.date.toString(),
        peopleNumber: params.peopleNumber.toString(),
      },
    });
    return this.http.get<Hour[]>(`${this.apiUrl}/availableHours`, {
      params: httpParams,
    });
  }
}
