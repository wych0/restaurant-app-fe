import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrorService } from 'src/app/modules/core/services/form-error-service';

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
  submitted: boolean = false;
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

  getErrorMessage(control: FormControl) {
    return this.formErrorService.getErrorMessage(control);
  }
}
