import {ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit, ViewEncapsulation} from '@angular/core';
import {Form, FormControl, FormGroupDirective, FormsModule, NgForm} from '@angular/forms';
import {FormBuilder , Validators} from '@angular/forms';
import {PasswordValidator} from '../Validators/password.validator';
import {LoginRegisterService} from '../../services/login-register.service';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material/core';
import {PasswordStrengthValidator} from '../Validators/passwordstrength.validator';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control.invalid && control.touched);
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class RegisterComponent implements OnInit {
  imagefile;
  bool = true;
  formdata: FormData;
  matcher = new ErrorStateMatcher();
  constructor(@Inject(LOCALE_ID) private locale: string, private fb: FormBuilder,
              private register: LoginRegisterService, private route: Router ) { }
  registrationForm = this.fb.group({
    userName : ['', [Validators.required, Validators.minLength(4)]],
    email : ['', [Validators.required, Validators.email]],
    password: ['', [ Validators.required, Validators.minLength(8), PasswordStrengthValidator]],
    confirmPassword : ['', [Validators.required ]],
    birthDate: ['', [Validators.required]],
  }, {validator: [PasswordValidator]});
  ngOnInit(): void {
  }
  bindImage(event) {
    const file = event.target.files[0];
    const Reader = new FileReader();
    Reader.onload = (e) => this.imagefile = Reader.result;
    Reader.readAsDataURL(file);
    this.bool = false;
}
  onSubmit() {
    this.formdata = new FormData();
    this.formdata.append('name', this.registrationForm.get('userName').value);
    this.formdata.append('email', this.registrationForm.get('email').value);
    this.formdata.append('password', this.registrationForm.get('password').value);
    this.formdata.append('c_password', this.registrationForm.get('confirmPassword').value);
    this.formdata.append('birthdate', formatDate(this.registrationForm.get('birthDate').value, 'yyyy-MM-dd', this.locale));
    this.register.register(this.formdata).subscribe(
      response => {console.log('Success', response); this.route.navigate(['/login']); },
      error => window.alert(error)
    );
  }

  onStrengthChanged($event: number) {
    const percentage = $event;
    if (percentage <= 30  ) {
      this.registrationForm.get('password').markAsDirty();
    } else if (percentage > 30) {
      this.registrationForm.get('password').markAsPristine();
    }
  }
}
