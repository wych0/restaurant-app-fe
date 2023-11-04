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

export interface RecoverForm {
  email: FormControl<string>;
}

export type RegisterForm = LoginForm;
