import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { add, format } from 'date-fns';
import { fadeIn, fadeOut } from '../../../constants/animations';
import { ReservationService } from 'src/app/modules/core/services/reservation.service';
import {
  AdditionalOptions,
  AvailableHoursParams,
  CreateReservation,
} from 'src/app/modules/core/models/reservation.model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/modules/core/services/form-service';
import { provideNgxMask } from 'ngx-mask';
import { PersonalData } from 'src/app/modules/core/models/personalData.model';
import { ReservationForm } from 'src/app/modules/core/models/forms.model';
import {
  reservedHourMessage,
  successfulMessage,
  usedEmailMessage,
} from '../../../constants/reservationMessages';
import { Size } from 'src/app/modules/core/models/spinner.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthUser } from 'src/app/modules/auth/store/auth.selectors';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
  animations: [fadeIn, fadeOut],
  providers: [provideNgxMask()],
})
export class ReservationModalComponent implements OnInit {
  submitted: boolean = false;
  hoursLoaded: boolean = false;
  creatingStatus: string | null = null;
  creatingMessage: string | null = null;
  reservationForm: FormGroup<ReservationForm> =
    this.formService.initReservationForm();
  selectedDate: Date | null = null;
  selectedPeopleNumber: number = 1;
  selectedHour: string | null = null;
  formatedDate: string | null = null;
  minDate: Date = new Date();
  maxDate: Date = add(new Date(), { months: 6 });
  availableHours: string[] = [];
  spinnerSize: Size = Size.BIG;
  userId: string | undefined;

  constructor(
    private reservationService: ReservationService,
    private formService: FormService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  dataSelected(): void {
    if (this.selectedDate) {
      this.hoursLoaded = false;
      this.availableHours = [];
      this.formatedDate = format(this.selectedDate, 'EEEE, MMMM dd yyyy');
      const params: AvailableHoursParams = {
        date: this.selectedDate,
        peopleNumber: this.selectedPeopleNumber,
      };
      this.reservationService.getAvailableHours(params).subscribe(
        (availableHours) => {
          this.availableHours = availableHours;
          this.hoursLoaded = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  hourSelected(hour: any): void {
    this.selectedHour = hour;
    if (hour === null) {
      this.creatingStatus = null;
      this.dataSelected();
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.reservationForm.valid) {
      this.creatingStatus = 'Creating';
      const formData = this.reservationForm.getRawValue();
      this.store.select(selectAuthUser).subscribe((user) => {
        this.userId = user?.id;
      });
      const additionalOptions: AdditionalOptions = {
        wheelchair: formData.wheelchair,
        baby: formData.baby,
        cake: formData.cake,
      };
      const personalData: PersonalData = {
        firstName: formData.firstName,
        secondName: formData.secondName,
        email: formData.email,
        phone: formData.phone,
      };
      const reservation: CreateReservation = {
        date: this.selectedDate || new Date(),
        hour: this.selectedHour || '',
        peopleNumber: this.selectedPeopleNumber,
        requests: formData.requests,
        personalData,
        additionalOptions,
        userId: this.userId,
      };
      this.reservationService.addReservation(reservation).subscribe({
        next: (reservation) => {
          this.creatingStatus = 'Created';
          this.reservationService.setReservationCreated();
          this.creatingMessage = successfulMessage;
        },
        error: (error) => {
          this.creatingStatus = 'Failed';
          this.creatingMessage =
            error.status === 409 ? usedEmailMessage : reservedHourMessage;
        },
      });
    }
  }

  resetValues(): void {
    this.reservationForm.reset();
    this.submitted = false;
    this.hoursLoaded = false;
    this.selectedDate = null;
    this.selectedHour = null;
    this.creatingStatus = null;
    this.creatingMessage = null;
    this.selectedPeopleNumber = 1;
    this.availableHours = [];
  }

  getErrorMessage(control: FormControl, name?: string) {
    return this.formService.getErrorMessage(control, name);
  }

  checkControlInvalid(control: FormControl): boolean {
    return this.formService.controlInvalid(control, this.submitted);
  }
}
