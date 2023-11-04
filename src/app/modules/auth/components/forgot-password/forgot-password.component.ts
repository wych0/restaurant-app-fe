import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/modules/core/services/form-service';
import { Display } from '../../constants/display.enum';
import { RecoverForm } from 'src/app/modules/core/models/forms.model';
import { fadeIn } from 'src/app/modules/shared/constants/animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../../common-styles.scss'],
  animations: [fadeIn],
})
export class ForgotPasswordComponent {
  @Output() changeComponent = new EventEmitter<Display>();
  submitted: boolean = false;
  recoverForm: FormGroup<RecoverForm> = this.formService.initRecoverForm();

  constructor(private formService: FormService) {}

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
    return this.formService.getErrorMessage(control);
  }

  checkControlInvalid(control: FormControl) {
    return this.formService.controlInvalid(control, this.submitted);
  }
}
