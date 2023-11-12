import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

import { FormService } from 'src/app/modules/core/services/form-service';
import { ForgotPasswordForm } from 'src/app/modules/core/models/forms.model';
import { fadeIn } from 'src/app/modules/shared/constants/animations';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { SendRecoverPasswordEmailData } from 'src/app/modules/core/models/auth.model';
import { Display } from '../../constants/display.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../../common-styles.scss'],
  animations: [fadeIn],
})
export class ForgotPasswordComponent {
  @Output() changeComponent = new EventEmitter<Display>();
  submitted: boolean = false;
  recoverForm: FormGroup<ForgotPasswordForm> =
    this.formService.initForgotPasswordForm();
  error: string | null = null;

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private notifierService: NotifierService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.submitted = true;
    if (this.recoverForm.valid) {
      const formData = this.recoverForm.getRawValue();
      const sendRecoverPasswordEmailData: SendRecoverPasswordEmailData = {
        email: formData.email,
      };
      this.authService
        .sendRecoverPasswordEmail(sendRecoverPasswordEmailData)
        .subscribe({
          next: (response) => {
            this.notifierService.notify('success', response.message);
            this.router.navigate(['/']);
          },
          error: (response) => {
            this.error = response.error.message;
          },
        });
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
