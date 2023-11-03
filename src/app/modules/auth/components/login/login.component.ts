import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrorService } from 'src/app/modules/core/services/form-error-service';
import { Display } from '../../constants/display.enum';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('0.5s ease-in', style({ opacity: 1 })),
]);
const fadeIn = trigger('fadeIn', [enterTransition]);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../common-styles.scss'],
  animations: [fadeIn],
})
export class LoginComponent {
  @Output() changeComponent = new EventEmitter<Display>();
  submitted: boolean = false;
  allDisplays = Display;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private formErrorService: FormErrorService) {}

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  changeDisplay(newDisplay: Display): void {
    this.changeComponent.emit(newDisplay);
  }

  getErrorMessage(control: FormControl) {
    return this.formErrorService.getErrorMessage(control);
  }

  checkControlInvalid(control: FormControl) {
    return this.formErrorService.controlInvalid(control, this.submitted);
  }
}
