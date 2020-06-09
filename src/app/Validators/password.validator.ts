import {AbstractControl} from '@angular/forms';

export function PasswordValidator(controlName: AbstractControl): { [key: string]: boolean | null} {
  const password = controlName.get('password');
  const confirmpassword = controlName.get('confirmPassword');
  return password && confirmpassword && password.value !== confirmpassword.value ?
    { notmatch: true} : null;
}
