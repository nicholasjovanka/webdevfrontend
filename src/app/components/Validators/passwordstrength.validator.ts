import {AbstractControl} from '@angular/forms';

export function PasswordStrengthValidator(controlName: AbstractControl): { [key: string]: boolean | null} {
  const password = controlName.value;
  const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const fulfillcriteria: boolean = regex.test(password);
  return fulfillcriteria ? null : {notfulfill: true};
}
