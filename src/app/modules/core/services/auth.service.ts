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
} from '../models/auth.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  login(body: LoginData): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, body);
  }

  autologin(): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/autologin`, {});
  }

  register(body: RegisterData): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/register`, body);
  }

  logout(): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/logout`, {});
  }

  refresh(): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/refresh`, {});
  }

  activate(token: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.apiUrl}/activate/${token}`,
      {}
    );
  }

  resendActivationEmail(
    body: ResendActivationEmailData
  ): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.apiUrl}/resend-activation-email`,
      body
    );
  }

  recoverPassword(
    body: RecoverPasswordData,
    token: string
  ): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.apiUrl}/recover/${token}`,
      body
    );
  }

  sendRecoverPasswordEmail(
    body: SendRecoverPasswordEmailData
  ): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.apiUrl}/send-recover-password-email`,
      body
    );
  }

  checkRecoveryToken(token: string): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(
      `${this.apiUrl}/check-recovery-token/${token}`
    );
  }
}
