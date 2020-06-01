import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes,
  // ...
} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginRegisterService} from './services/login-register.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {share, take, takeUntil} from 'rxjs/operators';
import {User} from './Interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('OpenUI',  [
      transition(':enter', [
        animate('500ms', keyframes([
          style({ opacity: 0 , offset: 0}),
          style({ opacity: 1 , offset: 0.5 }),
        ]))
      ]),
      transition(':leave', [
        animate('500ms', keyframes([
          style({ opacity: 0.5 , offset: 0}),
          style({ opacity: 0 , offset: 0.5 }),
        ]))
      ])
      ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'finalproject';
  userImage: string;
  constructor(private router: Router, private loginservice: LoginRegisterService, private route: ActivatedRoute) {
  }
  userBarOn = false;
  userLoggedIn = false;
  userDetails: User;
  private ngUnsubscribe = new Subject();
  ngOnInit(): void {
    this.loginservice.Login();
    this.loginservice.getLoginStatus().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
    e => {this.userLoggedIn = e;
    });
    if (sessionStorage.getItem('loginState') === 'true') {
      this.loginservice.getUserDetails();
      this.loginservice.getUserProfilePicture();
    }
    this.loginservice.getPicture().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      image => {
        if (image !== 'none') {
          const reader = new FileReader();
          reader.onload = e => this.userImage = reader.result as string;
          reader.readAsDataURL(image);
        } else {
          this.userImage = null;
        }
      },
      (err) => { console.log(err); }
    );
    this.loginservice.getDetails().pipe(takeUntil(this.ngUnsubscribe), share()).subscribe(
      res => {this.userDetails = res; console.log(res)}
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  userBarOnChange() {
    if (this.userBarOn === false) {
      this.userBarOn = true;
    } else if (this.userBarOn === true) {
      this.userBarOn = false;
    }
  }
  goToUserProfile() {
   this.router.navigate(['/userprofile', this.userDetails.name]);
   this.userBarOnChange();
  }
  goToRegisterPage() {
    this.router.navigate(['/register']);
    this.userBarOnChange();
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
    this.userBarOnChange();
  }
  logOut() {
    sessionStorage.setItem('loginState', 'false');
    this.loginservice.Login();
    sessionStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
