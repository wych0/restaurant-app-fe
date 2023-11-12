import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [{ path: 'recover/:token', component: RecoverPasswordComponent }],
  },
  { path: 'activate/:token', component: ActivateAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
