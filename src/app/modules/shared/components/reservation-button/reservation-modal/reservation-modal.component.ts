import { Component, OnInit } from '@angular/core';
import { add, format } from 'date-fns';
import { fadeIn, fadeOut } from '../../../constants/animations';
import { ReservationService } from 'src/app/modules/core/services/reservation.service';
import { AvailableHoursParams } from 'src/app/modules/core/models/reservation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrorService } from 'src/app/modules/core/services/form-error-service';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
  animations: [fadeIn, fadeOut],
  providers: [provideNgxMask()],
})
export class ReservationModalComponent implements OnInit {
  submitted: boolean = false;
  dataLoaded: boolean = false;
  reservationForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    secondName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    requests: new FormControl(''),
    wheelchair: new FormControl(false),
    baby: new FormControl(false),
    cake: new FormControl(false),
  });
  selectedDate: Date | null = null;
  selectedPeopleNumber: number = 1;
  selectedHour: string | null = null;
  formatedDate: string | null = null;
  minDate: Date = new Date();
  maxDate: Date = add(new Date(), { months: 6 });
  availableHours: string[] = [];

  constructor(
    private reservationService: ReservationService,
    private formErrorService: FormErrorService
  ) {}

  ngOnInit(): void {}

  dataSelected(): void {
    if (this.selectedDate) {
      this.dataLoaded = false;
      this.availableHours = [];
      this.formatedDate = format(this.selectedDate, 'EEEE, MMMM dd yyyy');
      const params: AvailableHoursParams = {
        date: this.selectedDate,
        peopleNumber: this.selectedPeopleNumber,
      };
      this.reservationService.getAvailableHours(params).subscribe(
        (availableHours) => {
          this.availableHours = availableHours;
          this.dataLoaded = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  hourSelected(hour: any): void {
    this.selectedHour = hour;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.reservationForm.valid) {
      console.log(this.reservationForm.value);
    }
  }

  getErrorMessage(control: FormControl, name?: string) {
    return this.formErrorService.getErrorMessage(control, name);
  }

  checkControlInvalid(control: FormControl) {
    return this.formErrorService.controlInvalid(control, this.submitted);
  }
}
