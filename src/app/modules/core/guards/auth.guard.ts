import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService)
    .isAuth()
    .pipe(
      (take(1),
      map((isAuth) => {
        if (!isAuth) {
          router.navigate(['/auth']);
          return false;
        }
        return true;
      }))
    );
};

export const unauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService)
    .isAuth()
    .pipe(
      (take(1),
      map((isAuth) => {
        if (isAuth) {
          router.navigate(['/']);
          return false;
        }
        return true;
      }))
    );
};
