import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, unauthGuard } from './modules/core/guards/auth.guard';
import { workerGuard } from './modules/core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./modules/menu/menu.module').then((module) => module.MenuModule),
  },
  {
    path: 'auth',
    canActivate: [unauthGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./modules/gallery/gallery.module').then(
        (module) => module.GalleryModule
      ),
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/account/account.module').then(
        (module) => module.AccountModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/contact/contact.module').then(
        (module) => module.ContactModule
      ),
  },
  {
    path: 'worker',
    canActivate: [workerGuard],
    loadChildren: () =>
      import('./modules/worker/worker.module').then(
        (module) => module.WorkerModule
      ),
  },
  {
    path: 'confirm-reservation/:token',
    loadChildren: () =>
      import('./modules/confirm-reservation/confirm-reservation.module').then(
        (module) => module.ConfirmReservationModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
