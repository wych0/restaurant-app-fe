import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MessageResponse } from '../models/auth.model';
import { ChangePasswordData } from '../models/user.model';

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
}
