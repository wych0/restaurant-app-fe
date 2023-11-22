import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { add, format } from 'date-fns';
import { fadeIn, fadeOut } from '../../../constants/animations';
import { ReservationService } from 'src/app/modules/core/services/reservation.service';
import {
  AdditionalOptions,
  AvailableHoursParams,
  CreateReservation,
  CreateReservationResponse,
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
import { UserService } from 'src/app/modules/core/services/user.service';
import { User } from 'src/app/modules/core/models/user.model';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
  animations: [fadeIn, fadeOut],
  providers: [provideNgxMask()],
})
export class ReservationModalComponent implements OnInit {
  @Input() user!: User | null;
  @Output() modalClosed = new EventEmitter<void>();
  submitted: boolean = false;
  hoursLoaded: boolean = false;
  creatingStatus: string | null = null;
  creatingMessage: string | null = null;
  createdReservation: CreateReservationResponse | null = null;
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

  constructor(
    private reservationService: ReservationService,
    private formService: FormService,
    private userService: UserService
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
      this.reservationService.getAvailableHours(params).subscribe({
        next: (availableHours) => {
          this.availableHours = availableHours;
          this.hoursLoaded = true;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  hourSelected(hour: any): void {
    this.selectedHour = hour;
    if (hour === null) {
      this.creatingStatus = null;
      this.dataSelected();
    } else {
      if (this.user) {
        this.reservationForm.controls.email.setValue(this.user.email);
        this.reservationForm.controls.email.disable();
        this.userService.getPersonalData().subscribe((personalData) => {
          if (personalData) {
            this.reservationForm.controls.firstName.setValue(
              personalData.firstName
            );
            this.reservationForm.controls.secondName.setValue(
              personalData.secondName
            );
            this.reservationForm.controls.phone.setValue(personalData.phone);
          }
        });
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.reservationForm.valid) {
      this.creatingStatus = 'Creating';
      const formData = this.reservationForm.getRawValue();
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
        userId: this.user ? this.user.id : undefined,
      };
      this.reservationService.add(reservation).subscribe({
        next: (reservation) => {
          this.creatingStatus = 'Created';
          this.reservationService.setReservationCreated();
          this.creatingMessage = successfulMessage;
          this.createdReservation = reservation;
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
    this.createdReservation = null;
    this.reservationForm.controls.email.enable();
    this.modalClosed.emit();
  }

  getErrorMessage(control: FormControl, name?: string) {
    return this.formService.getErrorMessage(control, name);
  }

  checkControlInvalid(control: FormControl): boolean {
    return this.formService.controlInvalid(control, this.submitted);
  }
}
