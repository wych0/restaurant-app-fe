import { AbstractControl, ValidatorFn } from '@angular/forms';

export function repeatPasswordValidator(
  passwordControlName: string,
  repeatPasswordName: string
): ValidatorFn {
  return (control: AbstractControl) => {
    const repeatPasswordControl = control.get(repeatPasswordName);
    const passwordValue = control.get(passwordControlName)?.value;
    const repeatPasswordValue = control.get(repeatPasswordName)?.value;

    if (passwordValue !== repeatPasswordValue) {
      repeatPasswordControl?.setErrors({ repeatPassword: true });
    }

    return null;
  };
}
