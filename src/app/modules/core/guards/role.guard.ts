import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthUser } from '../../auth/store/auth.selectors';
import { inject } from '@angular/core';
import { map, of, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const workerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  return inject(AuthService)
    .isAuth()
    .pipe(
      (take(1),
      switchMap((isAuth) => {
        if (isAuth) {
          return store.select(selectAuthUser).pipe(
            map((user) => {
              if (user && user.role === 'CLIENT') {
                router.navigate(['/']);
                return false;
              }
              return true;
            })
          );
        }
        return of(false);
      }))
    );
};
