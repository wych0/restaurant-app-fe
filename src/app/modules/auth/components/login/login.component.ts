import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/modules/core/services/form-service';
import { Display } from '../../constants/display.enum';
import { LoginForm } from 'src/app/modules/core/models/forms.model';
import { fadeIn } from 'src/app/modules/shared/constants/animations';

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
  loginForm: FormGroup<LoginForm> = this.formService.initLoginForm();

  constructor(private formService: FormService) {}

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
    return this.formService.getErrorMessage(control);
  }

  checkControlInvalid(control: FormControl) {
    return this.formService.controlInvalid(control, this.submitted);
  }
}
