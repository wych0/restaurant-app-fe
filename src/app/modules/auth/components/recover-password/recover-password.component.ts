import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { RecoverPasswordData } from 'src/app/modules/core/models/auth.model';
import { RecoverPasswordForm } from 'src/app/modules/core/models/forms.model';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { FormService } from 'src/app/modules/core/services/form-service';
import { fadeIn } from 'src/app/modules/shared/constants/animations';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
  animations: [fadeIn],
})
export class RecoverPasswordComponent implements OnInit {
  submitted: boolean = false;
  recoverForm: FormGroup<RecoverPasswordForm> =
    this.formService.initRecoverPasswordForm();
  sub = new Subscription();
  token!: string;
  isTokenValid: boolean = false;

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.token = params['token'];
      this.authService.checkRecoveryToken(this.token).subscribe({
        next: () => {
          this.isTokenValid = true;
        },
        error: () => {
          this.router.navigate(['/']);
        },
      });
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.recoverForm.valid && this.isTokenValid) {
      const formData = this.recoverForm.getRawValue();
      const recoverPasswordData: RecoverPasswordData = {
        password: formData.password,
      };
      this.authService
        .recoverPassword(recoverPasswordData, this.token)
        .subscribe({
          next: (response) => {
            this.notifierService.notify('success', response.message);
            this.router.navigate(['/auth']);
          },
          error: (response) => {
            console.log(response.error.message);
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
