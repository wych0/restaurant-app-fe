import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmReservationComponent } from './confirm-reservation.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmReservationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmReservationRoutingModule {}
