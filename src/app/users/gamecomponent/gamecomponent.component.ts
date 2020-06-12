import {Component, Inject, LOCALE_ID, NgModule, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Game} from '../../Interfaces/game';
import {Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {LoginRegisterService} from '../../services/login-register.service';
import {BrowserModule} from '@angular/platform-browser';
import {CustomDialogComponent} from '../../custom-dialog/custom-dialog.component';
import {ReviewServiceService} from '../../services/review-service.service';
import {Review} from '../../Interfaces/review';
import {ReviewPaginate} from '../../Interfaces/review-paginate';

@Component({
  selector: 'app-gamecomponent',
  templateUrl: './gamecomponent.component.html',
  styleUrls: ['./gamecomponent.component.css']
})
export class GamecomponentComponent implements OnInit, OnDestroy {
  platform1on = '';
  platform2on = '';
  platform3on = '';
  platform4on = '';
  platform5on = '';
  platform6on = '';
  imageFile;
  isLoaded = false;
  isLoggedIn = false;
  gameImage: string;
  onSteam = false;
  steamScore;
  WebsiteScore;
  idisPassed = false;
  currentpage;
  lastpage;
  beenSent = false;
  reviewForm: FormGroup;
  private formdata: FormData;
  constructor(private fb: FormBuilder, private game: GameService, @Inject(LOCALE_ID) private locale,
              private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
              private snackbar: MatSnackBar, private login: LoginRegisterService, private review: ReviewServiceService) { }
  gameObject: Game;
  Reviews: Review[];
  name: string[] = [];
  hasReview = false;
  private id;
  private ngUnsubscribe = new Subject();
  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe),
      map(res => {this.id = res.get('id');
                  this.idisPassed = true; return res; }), switchMap(res => this.game.getCertaingame(res.get('id'))))
      .subscribe((res: Game) => {
        this.gameObject = res;
        this.isLoaded = true;
        this.Validate(this.gameObject);
        this.review.ScrollThroughReview(this.id);
        this.review.getWebsiteScore(this.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          s => this.WebsiteScore = s
        );
        this.isOnSteam();
        if (this.onSteam === true) {
          this.game.getSteamGame(this.gameObject.steamId).toPromise().then(
              score => {this.steamScore = score; }
          );
        }
      });
    this.review.getfivelatestreview().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r: ReviewPaginate) => {if (r) {this.Reviews = r.data;
                                      if (this.beenSent) { this.Reviews.forEach( (e: Review) => this.login.getUserName(e.user_id)
                                        .pipe(takeUntil(this.ngUnsubscribe)).subscribe( nameresult => this.name.push(nameresult))); }
                                      this.beenSent = true;
                                      this.lastpage = r.last_page; this.currentpage =
        r.current_page; } }
    );
    this.login.getLoginStatus().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      res => {this.isLoggedIn = res;
              if (this.isLoggedIn) {
        this.reviewForm = this.fb.group({
          userScore: ['', Validators.required],
          userReview: ['', [Validators.maxLength(1500), Validators.required]]
        });
        if (this.idisPassed) {
          this.review.getspecificuser(this.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe( (u: Review) => {
              if (u) {
                this.hasReview = true;
                this.reviewForm.patchValue({
                  userScore: u.userScore,
                  userReview: u.userReview,
                });
              }
            }
          );
        }
      }
      }
    );

    this.game.getGameImage(this.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      image => {
        if (image) {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = e => {
            this.gameImage = reader.result as string;
          };
        } else {
          this.gameImage = null;
        }
      },
      err => console.log(err)
    );
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  Validate(game: Game) {
    let platformstring = 'Platform: ';
    if (game.platform) {
      const platform1on = game.platform.platform1 === 'PC';
      const platform2on = game.platform.platform2 === 'XBOX ONE';
      const platform3on = game.platform.platform3 === 'PS4';
      const platform4on = game.platform.platform4 === 'Nintendo Switch';
      const platform5on = game.platform.platform5 === 'Xbox 360';
      const platform6on = game.platform.platform6 === 'PS3';
      if (platform1on) {
        platformstring += game.platform.platform1 + ' |';
      }
      if (platform2on) {
        platformstring += game.platform.platform2 + ' |';
      }
      if (platform3on) {
        platformstring += game.platform.platform3 + ' |';
        // tslint:disable-next-line:align
      }
      if (platform4on) {
        platformstring += game.platform.platform4 + ' |';
      }
      if (platform5on) {
        platformstring += game.platform.platform5 + ' |';
        // tslint:disable-next-line:align
      }
      if (platform6on) {
        platformstring += game.platform.platform6 + ' |';
      }
    }
    return platformstring;
  }

  deleteReview() {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '400px',
      height: '300px'
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res === 'true') {
        console.log(this.id);
        this.review.deleteuserReview(this.id).subscribe( result => { console.log(res);
        }, err => {     this.snackbar.open('Game Deleted', 'Dismiss', {duration: 2000});
                        setTimeout(() => location.reload() , 2500); } );
      }
    });
  }
  OnSteamString() {
    let onsteam;
    if (this.gameObject.onSteam === 1) {
      onsteam = 'Yes';
    } else {
      onsteam = 'No';
    }
    return onsteam;
}
  isOnSteam() {
    if (this.gameObject.onSteam === 1) {
      this.onSteam = true;
    }
  }
  getPublishDate() {
    let publish = 'Released at: ';
    if (this.gameObject.gameReleaseDate) {
      publish += this.gameObject.gameReleaseDate.toString();
    } else {
      publish += 'NYB';
    }
    return publish;
  }
  getYear() {
    if (this.gameObject.gameReleaseDate) {
      return this.gameObject.gameReleaseDate.toString().substring(0, 4);
    } else {
      return 'Not Announced';
    }
  }
  submitReview() {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '400px',
      height: '300px'
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res === 'true') {
        this.formdata = new FormData();
        this.formdata.append('userReview', this.reviewForm.get('userReview').value);
        this.formdata.append('userScore', this.reviewForm.get('userScore').value);
        this.formdata.append('game_id', this.gameObject.id.toString());
        this.review.addeditreview(this.formdata).subscribe( result => { { this.snackbar.open('Review Updated', 'Dismiss', {duration: 2000});
                                                                          location.reload();
        }
        },
    );
  }
});
}
 canNext() {
    if (this.currentpage < this.lastpage) {
      return false;
    } else {
      return true;
    }
 }
 canPrev() {
    if (this.currentpage > 1) {
      return false;
    } else {
      return true;
    }
    }
    goNext() {
    this.currentpage += 1;
    this.review.ScrollThroughReview(this.id, this.currentpage);
    }
    goPrev() {
      this.currentpage -= 1;
      this.review.ScrollThroughReview(this.id, this.currentpage);
    }
}
