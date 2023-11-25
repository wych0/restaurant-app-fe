import { AbstractControl, ValidatorFn } from '@angular/forms';

export function priveValidator(): ValidatorFn {
  return (
    control: AbstractControl
  ): { [key: string]: { value: string } } | null => {
    const value = control.value;

    if (value === null || value <= 0) {
      return { invalidPrice: { value } };
    }

    return null;
  };
}
