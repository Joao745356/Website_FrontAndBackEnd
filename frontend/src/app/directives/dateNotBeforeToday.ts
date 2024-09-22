import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { MakeDonationRequestComponent } from '../components/pages/make-donation-request/make-donation-request.component';

@Directive({
  selector: '[appDateNotBeforeToday]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DateNotBeforeTodayDirective,
      multi: true
    }
  ]
})
export class DateNotBeforeTodayDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return MakeDonationRequestComponent.dateNotBeforeToday(control);
  }
}
