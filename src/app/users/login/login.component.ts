import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRegisterService} from '../../services/login-register.service';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginform: FormGroup;
  loginformdata: FormData;
  constructor(private fb: FormBuilder,
              private loginservice: LoginRegisterService, private route: Router , private dialog: MatDialog) { }

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
              sessionStorage.setItem('loginState', 'true');
              this.loginservice.curentstate = true;
              this.route.navigate(['/homepage']);
              this.loginservice.getUserProfilePicture(); this.loginservice.Login(), this.loginservice.getUserDetails();
      },
      (err) => {this.openDialog('Email or password is wrong'); }
    );
  }

  openDialog(err: any) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {error: err.toString()},
      width: '600',
      height: '600'
    });
  }
}
