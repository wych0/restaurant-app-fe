import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Error } from '../../core/models/error.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        return this.authService.login(action.loginData).pipe(
          map((user) => {
            const path = user.role === 'CLIENT' ? '/' : '/worker';
            this.router.navigate([path]);
            return AuthActions.loginSuccess({ user });
          }),
          catchError((response) => {
            const error: Error = {
              error: response.error.message,
              status: response.status,
            };
            return of(AuthActions.loginFailure({ error }));
          })
        );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(() => {
        return this.authService.autologin().pipe(
          map((user) => {
            return AuthActions.autoLoginSuccess({ user });
          }),
          catchError(() => of(AuthActions.autoLoginFailure()))
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return this.authService.logout().pipe(
          map((response) => {
            this.notifierService.notify('success', response.message);
            this.router.navigate(['/']);
            return AuthActions.logoutSuccess();
          }),
          catchError(() => of(AuthActions.logoutFailure()))
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) => {
        return this.authService.register(action.registerData).pipe(
          map((response) => {
            this.notifierService.notify('success', response.message);
            return AuthActions.registerSuccess();
          }),
          catchError((response) => {
            const error: Error = {
              error: response.error.message,
              status: response.status,
            };
            return of(AuthActions.registerFailure({ error }));
          })
        );
      })
    )
  );
}
