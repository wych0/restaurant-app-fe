import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ChangePasswordForm } from 'src/app/modules/core/models/forms.model';
import { Size } from 'src/app/modules/core/models/spinner.model';
import { ChangePasswordData } from 'src/app/modules/core/models/user.model';
import { FormService } from 'src/app/modules/core/services/form-service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { fadeIn } from 'src/app/modules/shared/constants/animations';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [fadeIn],
})
export class ChangePasswordComponent {
  submitted: boolean = false;
  changePasswordForm: FormGroup<ChangePasswordForm> =
    this.formService.initChangePasswordForm();
  errorMessage: string | null = null;
  isLoading: boolean = false;
  spinnerSize: Size = Size.SMALL;

  constructor(
    private formService: FormService,
    private userService: UserService,
    private notifierService: NotifierService
  ) {}

  onSubmit(): void {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      const formData = this.changePasswordForm.getRawValue();
      const changePasswordData: ChangePasswordData = {
        password: formData.password,
        newPassword: formData.newPassword,
      };
      this.userService.changePassword(changePasswordData).subscribe({
        next: (response) => {
          this.notifierService.notify('success', response.message);
          this.changePasswordForm.reset();
          this.isLoading = false;
          this.submitted = false;
          this.errorMessage = null;
        },
        error: (response) => {
          this.errorMessage = response.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  getErrorMessage(control: FormControl): string | undefined {
    return this.formService.getErrorMessage(control);
  }

  checkControlInvalid(control: FormControl): boolean {
    return this.formService.controlInvalid(control, this.submitted);
  }
}
