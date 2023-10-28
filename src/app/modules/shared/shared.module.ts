import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationButtonComponent } from './components/reservation-button/reservation-button.component';
import { MaterialModule } from './material/material.module';
import { FocusInvalidInputDirective } from './directives/focus-invalid-input.directive';
import { SwiperDirective } from './directives/swiper.directive';

@NgModule({
  declarations: [
    ReservationButtonComponent,
    FocusInvalidInputDirective,
    SwiperDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ReservationButtonComponent,
    FocusInvalidInputDirective,
    SwiperDirective,
  ],
})
export class SharedModule {}
