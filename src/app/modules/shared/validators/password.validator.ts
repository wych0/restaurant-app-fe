import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (
    control: AbstractControl
  ): { [key: string]: { value: string } } | null => {
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*,.]).{8,}$/;
    const value = control.value;
    if (!value || strongPasswordPattern.test(value)) {
      return null;
    }

    return { password: { value } };
  };
}
