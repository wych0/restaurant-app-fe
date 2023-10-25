import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationButtonComponent } from './components/reservation-button/reservation-button.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [ReservationButtonComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ReservationButtonComponent,
  ],
})
export class SharedModule {}
