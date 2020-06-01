import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRegisterService} from '../../services/login-register.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginform: FormGroup;
  loginformdata: FormData;
  constructor(private fb: FormBuilder,
              private loginservice: LoginRegisterService, private route: Router ) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email : ['', [Validators.required , Validators.email]],
      password : ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
  }

  login() {
  this.loginformdata = new FormData();
  this.loginformdata.append('email', this.loginform.get('email').value);
  this.loginformdata.append('password', this.loginform.get('password').value);
  this.loginservice.login(this.loginformdata).subscribe(
    res => {sessionStorage.setItem('token', res.success.token);
            sessionStorage.setItem('loginState', 'true')
            this.loginservice.curentstate = true;
            this.route.navigate(['/home']);
            this.loginservice.getUserProfilePicture(); this.loginservice.Login(), this.loginservice.getUserDetails();
            },
    (err) => {window.alert('Email or password is wrong'); }
  );
  }
}
