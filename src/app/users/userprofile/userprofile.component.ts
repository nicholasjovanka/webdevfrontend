import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginRegisterService} from '../../services/login-register.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {map, share, switchMap, takeUntil} from 'rxjs/operators';
import {User} from '../../Interfaces/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {newPasswordValidator} from '../../Validators/newpassword.validator';
import {PasswordStrengthValidator} from '../../Validators/passwordstrength.validator';
import {formatDate} from '@angular/common';
import {ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomDialogComponent} from '../../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  private formdata: FormData;
  constructor(@Inject(LOCALE_ID) private locale, private router: Router,
              private loginservice: LoginRegisterService, private fb: FormBuilder, public dialog: MatDialog, private snackbar: MatSnackBar
  ) { }
  userImage: string;
  editprofileform: FormGroup = this.fb.group({
    oldPassword: ['']
  });
  userDetails: User;
  imageFile;
  matcher = new ShowOnDirtyErrorStateMatcher();
  isLoaded = false;
  ngOnInit(): void {
    this.loginservice.getDetails().pipe(takeUntil(this.ngUnsubscribe),
      map(userdata => { this.userDetails = userdata; return userdata; } ), switchMap( res => this.loginservice.getPicture() )).subscribe(
      image => {
        if (image) {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = e => {this.userImage = reader.result as string;
                                this.editprofileform = this.fb.group({
              userName: [this.userDetails.name, [Validators.required, Validators.minLength(4)]],
              email: [this.userDetails.email, [Validators.required, Validators.email]],
              oldPassword: [''],
              newPassword : ['', []],
              confirmPassword : ['', []],
              birthDate: [this.userDetails.birthdate, [Validators.required]],
              userImage: ['']
            }, {validators: [newPasswordValidator]});
                                this.isLoaded = true;
          };
        } else {
          this.userImage = null;
        }
      },
      err => console.log(err)
    );
    this.editprofileform.get('oldPassword').valueChanges.subscribe(
      value => { if (value) {
        this.editprofileform.get('newPassword').setValidators([Validators.required, PasswordStrengthValidator]);
        this.editprofileform.get('confirmPassword').setValidators([Validators.required]);
        this.editprofileform.get('confirmPassword').updateValueAndValidity();
      } else if (!value) {
        this.editprofileform.get('newPassword').clearValidators();
        this.editprofileform.get('confirmPassword').clearValidators();
        this.editprofileform.get('confirmPassword').updateValueAndValidity();
      }}
    );
  }
  checksize($event) {
    const file = $event.target.files[0];
    this.imageFile = file;
    if ((file.size / 1204 / 1204) > 1) {
      window.alert('Maximum File size is 1024 Kilobytes');
      this.editprofileform.patchValue({
        userImage : null
      });
    } else {
      const reader = new FileReader();
      reader.onload = e => this.userImage = reader.result as string;
      reader.readAsDataURL(file);
    }

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  submitChanges() {
    this.formdata = new FormData();
    this.formdata.append('name', this.editprofileform.get('userName').value);
    this.formdata.append('email', this.editprofileform.get('email').value);
    this.formdata.append('birthdate', formatDate(this.editprofileform.get('birthDate').value, 'yyyy-MM-dd', this.locale));
    if (this.editprofileform.get('oldPassword').value !== '') {
      this.formdata.append('oldpassword', this.editprofileform.get('oldPassword').value);
      this.formdata.append('newpassword', this.editprofileform.get('newPassword').value);
      this.formdata.append('c_password', this.editprofileform.get('confirmPassword').value);
    }
    if (this.editprofileform.get('userImage').value !== null || this.editprofileform.get('userImage').value !== '') {
      this.formdata.append('userimage', this.imageFile);
    }
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '400px',
      height: '300px'
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res === 'true') {
        this.loginservice.UpdateProfile(this.formdata).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          response => {  this.snackbar.open('Profile Edited', 'Dismiss', {duration: 2000}); setTimeout(() => location.reload(), 2500); },
          error => this.openDialog(error)
        );
      }
    });
  }

  onStrengthChanged($event: number) {
    const percentage = $event;
    if (percentage <= 30  ) {
      this.editprofileform.get('newPassword').markAsDirty();
    } else if (percentage > 30) {
      this.editprofileform.get('newPassword').markAsPristine();
    }
  }
  openDialog(err: any) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {error: err.toString()},
      width: '600',
      height: '600'
    });
  }
}

