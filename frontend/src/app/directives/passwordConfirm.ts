import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(passwordKey)?.value;
      const confirmPassword = formGroup.get(confirmPasswordKey)?.value;
      return password && confirmPassword && password !== confirmPassword ? { 'passwordMismatch': true } : null;
    };
}
