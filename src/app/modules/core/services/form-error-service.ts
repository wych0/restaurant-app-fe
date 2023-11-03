import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
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
    return;
  }

  controlInvalid(control: FormControl, submitted: boolean) {
    if (
      (control.invalid && control.touched) ||
      (submitted && control.invalid)
    ) {
      return true;
    }
    return false;
  }
}
