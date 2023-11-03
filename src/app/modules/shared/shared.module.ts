import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationButtonComponent } from './components/reservation-button/reservation-button.component';
import { MaterialModule } from './material/material.module';
import { FocusInvalidInputDirective } from './directives/focus-invalid-input.directive';
import { SwiperDirective } from './directives/swiper.directive';
import { ReservationModalComponent } from './components/reservation-button/reservation-modal/reservation-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
  declarations: [
    ReservationButtonComponent,
    FocusInvalidInputDirective,
    SwiperDirective,
    ReservationModalComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    NgxMaskDirective,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ReservationButtonComponent,
    FocusInvalidInputDirective,
    SwiperDirective,
    SpinnerComponent,
  ],
})
export class SharedModule {}
