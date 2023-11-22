import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MessageResponse } from '../models/auth.model';
import { ChangePasswordData } from '../models/user.model';
import {
  GetReservationsParams,
  GetUserReservationsResponse,
} from '../models/reservation.model';
import { PersonalData } from '../models/personalData.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  changePassword(body: ChangePasswordData): Observable<MessageResponse> {
    return this.http.patch<MessageResponse>(
      `${this.apiUrl}/change-password`,
      body
    );
  }

  getPersonalData(): Observable<PersonalData> {
    return this.http.get<PersonalData>(`${this.apiUrl}/personal-data`);
  }

  getReservations(
    paramsObject: GetReservationsParams
  ): Observable<GetUserReservationsResponse> {
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
    return this.http.get<GetUserReservationsResponse>(
      `${this.apiUrl}/reservations`,
      {
        params,
      }
    );
  }
}
