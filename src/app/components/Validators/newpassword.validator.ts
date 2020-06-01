import {AbstractControl} from '@angular/forms';
export function newPasswordValidator(controlName: AbstractControl): { [key: string]: boolean | null} {
  const oldpassword = controlName.get('oldPassword').value;
  const newpassword = controlName.get('newPassword').value;
  const confirmPassword = controlName.get('confirmPassword').value;
  if (oldpassword !== '') {
    if (newpassword !== '' && confirmPassword !== '') {
      if (newpassword !== confirmPassword) {
        return {notmatch: true};
      } else {
        return null;
      }
    } else {
      return {empty: true};
    }
  } else {
    return null;
  }
}

