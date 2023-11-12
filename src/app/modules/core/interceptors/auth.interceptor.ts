import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/store/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('/auth/login')) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            return this.authService.refresh().pipe(
              switchMap(() => {
                this.isRefreshing = false;
                return next.handle(request);
              }),
              catchError((refreshError) => {
                this.isRefreshing = false;

                if (refreshError.status === 403) {
                  this.store.dispatch(AuthActions.logout());
                }

                return throwError(error);
              })
            );
          }
        }
        return throwError(error);
      })
    );
  }
}
