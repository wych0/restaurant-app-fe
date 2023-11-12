import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/modules/core/services/form-service';
import { Display } from '../../constants/display.enum';
import { LoginForm } from 'src/app/modules/core/models/forms.model';
import { fadeIn } from 'src/app/modules/shared/constants/animations';
import {
  LoginData,
  ResendActivationEmailData,
} from 'src/app/modules/core/models/auth.model';
import * as AuthActions from '../../store/auth.actions';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthError, selectAuthLoading } from '../../store/auth.selectors';
import { Size } from 'src/app/modules/core/models/spinner.model';
import { Error } from 'src/app/modules/core/models/error.model';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../common-styles.scss'],
  animations: [fadeIn],
})
export class LoginComponent implements OnDestroy {
  @Output() changeComponent = new EventEmitter<Display>();
  submitted: boolean = false;
  allDisplays = Display;
  loginForm: FormGroup<LoginForm> = this.formService.initLoginForm();
  error$: Observable<Error | null> = this.store.select(selectAuthError);
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  spinnerSize: Size = Size.SMALL;
  providedEmail: string | null = null;

  constructor(
    private formService: FormService,
    private store: Store<AppState>,
    private notifierService: NotifierService,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.getRawValue();
      this.providedEmail = formData.email;
      const loginData: LoginData = {
        email: formData.email,
        password: formData.password,
      };
      this.store.dispatch(AuthActions.login({ loginData }));
    }
  }

  changeDisplay(newDisplay: Display): void {
    this.changeComponent.emit(newDisplay);
  }

  getErrorMessage(control: FormControl): string | undefined {
    return this.formService.getErrorMessage(control);
  }

  checkControlInvalid(control: FormControl): boolean {
    return this.formService.controlInvalid(control, this.submitted);
  }

  resendEmail(): void {
    if (this.providedEmail) {
      const resendActivationEmailData: ResendActivationEmailData = {
        email: this.providedEmail,
      };
      this.authService
        .resendActivationEmail(resendActivationEmailData)
        .subscribe({
          next: (response) => {
            this.store.dispatch(AuthActions.clearError());
            this.notifierService.notify('success', response.message);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
