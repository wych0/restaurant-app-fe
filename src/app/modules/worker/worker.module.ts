import { NgModule } from '@angular/core';

import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerComponent } from './worker.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { DishesComponent } from './components/dishes/dishes.component';

@NgModule({
  declarations: [WorkerComponent, ReservationsComponent, DishesComponent],
  imports: [SharedModule, WorkerRoutingModule],
})
export class WorkerModule {}
