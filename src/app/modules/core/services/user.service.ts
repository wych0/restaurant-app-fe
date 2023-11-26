import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MessageResponse } from '../models/auth.model';
import {
  ChangePasswordData,
  GetWorkersParams,
  GetWorkersResponse,
  WorkerData,
} from '../models/user.model';
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

  deleteWorker(id: string): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}/${id}`);
  }

  createWorker(body: WorkerData): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}`, body);
  }

  getWorkers(paramsObject: GetWorkersParams): Observable<GetWorkersResponse> {
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
    if (paramsObject.term) {
      params = params.append('term', paramsObject.term);
    }
    return this.http.get<GetWorkersResponse>(`${this.apiUrl}`, {
      params,
    });
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
