import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AvailableHoursParams, Reservation } from '../models/reservation.model';
import { Table } from '../models/table.model';

import { environment } from 'src/environments/environment.development';

type Hour = string;

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/reservation`;
  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('assets/db.json').pipe(
      map((data: any) => {
        return data.reservations;
      })
    );
  }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>('assets/db.json').pipe(
      map((data: any) => {
        return data.tables;
      })
    );
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
