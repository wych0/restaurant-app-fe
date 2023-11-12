import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.development';
import {
  LoginData,
  MessageResponse,
  RecoverPasswordData,
  RegisterData,
  ResendActivationEmailData,
  SendRecoverPasswordEmailData,
  User,
} from '../models/auth.model';
import { Observable } from 'rxjs';

const apiUrl = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(body: LoginData): Observable<User> {
    return this.http.post<User>(`${apiUrl}/login`, body);
  }

  autologin(): Observable<User> {
    return this.http.post<User>(`${apiUrl}/autologin`, {});
  }

  register(body: RegisterData): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${apiUrl}/register`, body);
  }

  logout(): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${apiUrl}/logout`, {});
  }

  refresh(): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${apiUrl}/refresh`, {});
  }

  activate(token: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${apiUrl}/activate/${token}`, {});
  }

  resendActivationEmail(
    body: ResendActivationEmailData
  ): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${apiUrl}/resend-activation-email`,
      body
    );
  }

  recoverPassword(
    body: RecoverPasswordData,
    token: string
  ): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${apiUrl}/recover/${token}`, body);
  }

  sendRecoverPasswordEmail(
    body: SendRecoverPasswordEmailData
  ): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${apiUrl}/send-recover-password-email`,
      body
    );
  }

  checkRecoveryToken(token: string): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(
      `${apiUrl}/check-recovery-token/${token}`
    );
  }
}
