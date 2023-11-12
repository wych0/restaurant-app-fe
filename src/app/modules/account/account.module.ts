import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ReservationDetailsModalComponent } from './components/reservation-details-modal/reservation-details-modal.component';

@NgModule({
  declarations: [AccountComponent, ReservationsComponent, ReservationDetailsModalComponent],
  imports: [SharedModule, AccountRoutingModule],
  exports: [AccountComponent],
})
export class AccountModule {}
