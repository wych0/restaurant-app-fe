import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { format } from 'date-fns';
import { ReservationDetails } from 'src/app/modules/core/models/reservation.model';
import { Size } from 'src/app/modules/core/models/spinner.model';
import { ReservationService } from 'src/app/modules/core/services/reservation.service';
import { fadeIn } from 'src/app/modules/shared/constants/animations';

@Component({
  selector: 'app-reservation-details-modal',
  templateUrl: './reservation-details-modal.component.html',
  styleUrls: ['./reservation-details-modal.component.scss'],
  animations: [fadeIn],
})
export class ReservationDetailsModalComponent implements AfterViewInit {
  @Output() reservationUpdated = new EventEmitter<string>();
  @ViewChild('detailsModal') detailsModal!: ElementRef;
  reservationDetails: ReservationDetails | null = null;
  additionalOptions: string[] = [];
  reservationId!: string;
  formatedDate: string | null = null;
  isLoading: boolean | null = null;
  spinnerSize: Size = Size.BIG;
  errorMessage: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private notifierService: NotifierService
  ) {}

  ngAfterViewInit(): void {
    this.detailsModal.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.errorMessage = null;
    });
  }

  getReservationDetails(id: string): void {
    this.isLoading = true;
    this.reservationId = id;
    this.reservationService.getReservationDetails(id).subscribe({
      next: (reservationDetails) => {
        this.isLoading = false;
        this.reservationDetails = reservationDetails;
        if (reservationDetails.additionalOptions) {
          this.additionalOptions = Object.entries(
            reservationDetails.additionalOptions
          )
            .filter(([key, value]) => value === true)
            .map(([key]) => key);
        }
        this.formatedDate = format(
          new Date(reservationDetails.date),
          'EEEE, MMMM dd yyyy'
        );
      },
      error: () => {
        this.isLoading = false;
        this.reservationUpdated.emit();
        this.reservationDetails = null;
        if (this.errorMessage) {
          this.errorMessage =
            'Fetching deatils and cancellation failed, reservation was probably deleted.';
        } else {
          this.errorMessage =
            'Fetching deatils failed, reservation was probably deleted.';
        }
      },
    });
  }

  cancelReservation(): void {
    this.isLoading = true;
    this.reservationService.cancel(this.reservationId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.reservationUpdated.emit();
        this.getReservationDetails(this.reservationId);
        this.notifierService.notify('success', response.message);
      },
      error: () => {
        this.isLoading = false;
        this.reservationUpdated.emit();
        this.errorMessage =
          'Cancellation failed, reservation was probably cancelled.';
        this.getReservationDetails(this.reservationId);
      },
    });
  }

  isCancellable(): boolean {
    if (this.reservationDetails) {
      if (
        this.reservationDetails.status === 'CANCELLED' ||
        this.reservationDetails.status === 'COMPLETED'
      ) {
        return false;
      }
      const maxDate = new Date();
      maxDate.setHours(maxDate.getHours() + 12);
      const reservationDate = new Date(this.reservationDetails.date);
      const resevationHour = parseInt(
        this.reservationDetails.hour.split(':')[0]
      );
      reservationDate.setHours(reservationDate.getHours() + resevationHour);

      if (reservationDate < maxDate) {
        return false;
      }

      return true;
    }
    return false;
  }
}
