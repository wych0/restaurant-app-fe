import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrorService } from 'src/app/modules/core/services/form-error-service';
import { Display } from '../../constants/display.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../../common-styles.scss'],
})
export class ForgotPasswordComponent {
  @Output() changeComponent = new EventEmitter<Display>();
  submitted: boolean = false;
  recoverForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private formErrorService: FormErrorService) {}

  onSubmit(): void {
    this.submitted = true;
    if (this.recoverForm.valid) {
      console.log(this.recoverForm.value);
    }
  }

  changeDisplay(): void {
    this.changeComponent.emit(Display.LOGIN);
  }

  getErrorMessage(control: FormControl) {
    return this.formErrorService.getErrorMessage(control);
  }
}
