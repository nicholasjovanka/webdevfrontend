import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {LoginRegisterService} from '../../services/login-register.service';
import {Verified} from '../../Interfaces/verified';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomDialogComponent} from '../../custom-dialog/custom-dialog.component';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notverified',
  templateUrl: './notverified.component.html',
  styleUrls: ['./notverified.component.css']
})
export class NotverifiedComponent implements OnInit {
  constructor(private router: Router, private login: LoginRegisterService, public dialog: MatDialog, private snackbar: MatSnackBar) { }
  private ngUnsubscribe = new Subject();
  public isverified: boolean;
  ngOnInit(): void {
    this.login.getVerification().subscribe(
      (res: Verified) => {
        if (!res.email_verified_at ) {
          console.log(res);
          this.isverified = false;
        } else if (res.email_verified_at) {
          this.isverified = true;
          this.router.navigate(['']);
        }
      }
    );
  }
  getState() {
    let statement = '';
    if (this.isverified) {
      statement = 'Verified';
    } else {
      statement = 'Not Verified';
    }
    return statement;
  }
  Resend() {
    if (!this.isverified) {
      this.login.resendVerification().subscribe(
        res => this.snackbar.open('Verification Email Is Sent', 'Dismiss', {duration: 2000}
      ), error => {
          console.log(error);
        });
    }
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['homepage']);
  }

}
