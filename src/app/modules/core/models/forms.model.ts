import { FormControl } from '@angular/forms';

export interface ReservationForm {
  firstName: FormControl<string>;
  secondName: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  requests: FormControl<string>;
  wheelchair: FormControl<boolean>;
  baby: FormControl<boolean>;
  cake: FormControl<boolean>;
}

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface RecoverPasswordForm {
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}

export interface ChangePasswordForm {
  password: FormControl<string>;
  newPassword: FormControl<string>;
  repeatNewPassword: FormControl<string>;
}

export interface ForgotPasswordForm {
  email: FormControl<string>;
}

export interface CancelReservationForm {
  reason: FormControl<string>;
}

export interface DishForm {
  name: FormControl<string>;
  ingredients: FormControl<string>;
  price: FormControl<number>;
  type: FormControl<string>;
  isSpicy: FormControl<boolean>;
  isVegan: FormControl<boolean>;
  isDisplayed: FormControl<boolean>;
}

export type RegisterForm = LoginForm;
