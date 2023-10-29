import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrorService } from 'src/app/modules/core/services/form-error-service';
import { Display } from '../../constants/display.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../common-styles.scss'],
})
export class RegisterComponent {
  @Output() changeComponent = new EventEmitter<Display>();
  submitted: boolean = false;
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private formErrorService: FormErrorService) {}

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
    return this.formErrorService.getErrorMessage(control);
  }
}
