import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ReservationDetails } from 'src/app/modules/core/models/reservation.model';
import { ReservationService } from 'src/app/modules/core/services/reservation.service';

@Component({
  selector: 'app-reservation-details-modal',
  templateUrl: './reservation-details-modal.component.html',
  styleUrls: ['./reservation-details-modal.component.scss'],
})
export class ReservationDetailsModalComponent {
  @Input({ required: true }) reservationDetails!: ReservationDetails;
  @Output() reservationConfirmed = new EventEmitter<string>();

  constructor(
    private reservationService: ReservationService,
    private notifierService: NotifierService
  ) {}

  confirmReservation(): void {
    this.reservationService
      .confirm(this.reservationDetails.confirmationToken)
      .subscribe({
        next: (response) => {
          this.reservationConfirmed.emit(this.reservationDetails.id);
          this.notifierService.notify('success', response.message);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
