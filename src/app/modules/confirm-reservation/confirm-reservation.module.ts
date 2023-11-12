import { NgModule } from '@angular/core';

import { ConfirmReservationRoutingModule } from './confirm-reservation-routing.module';
import { ConfirmReservationComponent } from './confirm-reservation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ConfirmReservationComponent],
  imports: [SharedModule, ConfirmReservationRoutingModule],
})
export class ConfirmReservationModule {}
