import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  LoginForm,
  RecoverPasswordForm,
  RegisterForm,
  ReservationForm,
  ForgotPasswordForm,
  ChangePasswordForm,
  CancelReservationForm,
  DishForm,
} from '../models/forms.model';
import { repeatPasswordValidator } from '../../shared/validators/password.validator';
import { priveValidator } from '../../shared/validators/price.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  initRecoverPasswordForm(): FormGroup<RecoverPasswordForm> {
    return new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(8)],
          nonNullable: true,
        }),
        repeatPassword: new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      },
      { validators: [repeatPasswordValidator('password', 'repeatPassword')] }
    );
  }

  initChangePasswordForm(): FormGroup<ChangePasswordForm> {
    return new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        newPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(8)],
          nonNullable: true,
        }),
        repeatNewPassword: new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      },
      {
        validators: [
          repeatPasswordValidator('newPassword', 'repeatNewPassword'),
        ],
      }
    );
  }

  initForgotPasswordForm(): FormGroup<ForgotPasswordForm> {
    return new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
    });
  }

  initLoginForm(): FormGroup<LoginForm> {
    return new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
  }

  initRegisterForm(): FormGroup<RegisterForm> {
    return new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
        nonNullable: true,
      }),
    });
  }

  initCancelReservationForm(): FormGroup<CancelReservationForm> {
    return new FormGroup({
      reason: new FormControl('', {
        nonNullable: true,
      }),
    });
  }

  initReservationForm(): FormGroup<ReservationForm> {
    return new FormGroup({
      firstName: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      secondName: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      phone: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      requests: new FormControl('', {
        validators: [Validators.maxLength(50)],
        nonNullable: true,
      }),
      wheelchair: new FormControl(false, { nonNullable: true }),
      baby: new FormControl(false, { nonNullable: true }),
      cake: new FormControl(false, { nonNullable: true }),
    });
  }

  initDishForm(): FormGroup<DishForm> {
    return new FormGroup({
      name: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      ingredients: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      price: new FormControl(0, {
        validators: [Validators.required, priveValidator()],
        nonNullable: true,
      }),
      type: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      isSpicy: new FormControl(false, { nonNullable: true }),
      isVegan: new FormControl(false, { nonNullable: true }),
      isDisplayed: new FormControl(false, { nonNullable: true }),
    });
  }

  getErrorMessage(control: FormControl, name?: string) {
    if (control.hasError('required')) {
      return 'This field is required.';
    }
    if (control.hasError('email')) {
      return 'Invalid email.';
    }
    if (control.hasError('minlength')) {
      return 'At least 8 chars.';
    }
    if (control.hasError('mask')) {
      return `Invalid ${name}.`;
    }
    if (control.hasError('repeatPassword')) {
      return `Passwords are not the same.`;
    }
    if (control.hasError('invalidPrice')) {
      return `Invalid price.`;
    }
    return;
  }

  controlInvalid(control: FormControl, submitted: boolean): boolean {
    if (
      (control.invalid && control.touched) ||
      (submitted && control.invalid)
    ) {
      return true;
    }
    return false;
  }
}
