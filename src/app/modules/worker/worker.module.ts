import { NgModule } from '@angular/core';

import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerComponent } from './worker.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { WorkersComponent } from './components/workers/workers.component';

@NgModule({
  declarations: [WorkerComponent, ReservationsComponent, DishesComponent, WorkersComponent],
  imports: [SharedModule, WorkerRoutingModule],
})
export class WorkerModule {}
