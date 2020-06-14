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
import {LoginRegisterService} from '../services/login-register.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, share, switchMap, take, takeUntil} from 'rxjs/operators';
import {User} from '../Interfaces/user';
import {Game} from '../Interfaces/game';
import {GameService} from '../services/game.service';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
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
export class UsersComponent implements OnInit, OnDestroy {
  title = 'finalproject';
  userImage: string;
  constructor(private router: Router, private loginservice: LoginRegisterService,
              private route: ActivatedRoute, private game: GameService) {
  }
  userBarOn = false;
  userLoggedIn = false;
  userDetails: User;
  // user: Game = {
  //   gameName: 'Test',
  //   gameDescription: 'Test 2',
  //   platform: {
  //     platform1: 't'
  //   },
  // };
  myControl = new FormControl('');
  private ngUnsubscribe = new Subject();
  filteredOptions: Observable<string>;
  ngOnInit(): void {
    this.loginservice.Login();
    this.loginservice.getLoginStatus().pipe(takeUntil(this.ngUnsubscribe), share()).subscribe(
      e => {this.userLoggedIn = e;
      });
    this.loginservice.getPicture().pipe(takeUntil(this.ngUnsubscribe), share()).subscribe(
      image => {
        if (image) {
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
      (res: User) => {if (res) { {this.userDetails = res; if (this.userLoggedIn && res.email_verified_at === null) {
        this.router.navigate(['/isverified']);
      } } } }
    );
    this.filteredOptions = this.myControl.valueChanges.pipe(debounceTime(425), distinctUntilChanged(),
      switchMap( res => this.game.AutoSuggest(res)));
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
    this.router.navigate(['/userprofile', this.userDetails.name, { foo: 'foo'}], {relativeTo: this.route});
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
    localStorage.setItem('loginState', 'false');
    this.loginservice.Login();
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
