import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/modules/core/services/form-service';
import { Display } from '../../constants/display.enum';
import { RegisterForm } from 'src/app/modules/core/models/forms.model';
import { fadeIn } from 'src/app/modules/shared/constants/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../common-styles.scss'],
  animations: [fadeIn],
})
export class RegisterComponent {
  @Output() changeComponent = new EventEmitter<Display>();
  submitted: boolean = false;
  registerForm: FormGroup<RegisterForm> = this.formService.initRegisterForm();

  constructor(private formService: FormService) {}

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

  changeDisplay(): void {
    this.changeComponent.emit(Display.LOGIN);
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  checkControlInvalid(control: FormControl) {
    return this.formService.controlInvalid(control, this.submitted);
  }
}
