
import {GameService} from '../../services/game.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Game} from '../../Interfaces/game';
import {formatDate} from '@angular/common';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {CustomDialogComponent} from '../../custom-dialog/custom-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-editgame',
  templateUrl: './editgame.component.html',
  styleUrls: ['./editgame.component.css']
})
export class EditgameComponent implements OnInit, OnDestroy {
  imageFile;
  gameImage: string;
  constructor(private fb: FormBuilder, private game: GameService, @Inject(LOCALE_ID) private locale,
              private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private snackbar: MatSnackBar) { }
  editgameform: FormGroup;
  formdata: FormData;
  gameObject: Game;
  private id;
  private ngUnsubscribe = new Subject();
  ngOnInit(): void {
    this.game.getCertaingame(this.game.getGameId())
      .subscribe((res: Game) => {
        this.gameObject = res;
        console.log(res);
        this.Validate(this.gameObject);
      });
    this.editgameform = this.fb.group({
      gameName: ['', Validators.required],
      gameImage: [''],
      gameDescription: ['', Validators.required],
      gameTrailer: [''],
      gamePublisher: [''],
      gameReleaseDate: [''],
      platform1: [''],
      platform2: [''],
      platform3: [''],
      platform4: [''],
      platform5: [''],
      platform6: [''],
      onSteam: [''],
      AgeRating: [''],
      steamId: [''],
    });
    console.log(this.id);
    this.game.getGameImage(this.game.getGameId()).subscribe(
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
  // noinspection DuplicatedCode
  checksize($event) {
    const file = $event.target.files[0];
    this.imageFile = file;
    if ((file.size / 1204 / 1204) > 1) {
      window.alert('Maximum File size is 1024 Kilobytes');
      this.editgameform.patchValue({
        gameImage : null
      });
    } else {
      const reader = new FileReader();
      reader.onload = e => this.gameImage = reader.result as string;
      reader.readAsDataURL(file);
    }
  }
    // noinspection DuplicatedCode
  submitGame() {
    //  const gameobject: Game = {
    //   gameName: this.editgameform.get('gameName').value,
    //   gameDescription: this.editgameform.get('gameDescription').value,
    //   platform: {
    //   },
    // };
    this.formdata = new FormData();
    this.formdata.append('gameName', this.editgameform.get('gameName').value, );
    this.formdata.append('gameDescription', this.editgameform.get('gameDescription').value);
    if (this.editgameform.get('gameReleaseDate').value) {
      this.formdata.append('gameReleaseDate', formatDate(this.editgameform.get('gameReleaseDate').value, 'yyyy-MM-dd', this.locale));
    }
    if (this.editgameform.get('gameImage').value !== null || this.editgameform.get('gameImage').value !== '') {
      this.formdata.append('gameImage', this.imageFile);
    }
    if (this.editgameform.get('gameTrailer').value) {
      this.formdata.append('gameTrailer', this.editgameform.get('gameTrailer').value);
    }
    if (this.editgameform.get('gamePublisher').value) {
      this.formdata.append('gamePublisher', this.editgameform.get('gamePublisher').value);
    }
    if (this.editgameform.get('onSteam').value) {
      this.formdata.append('onSteam', '1');
      this.formdata.append('steamId', this.editgameform.get('steamId').value);
    }
    if (this.editgameform.get('onSteam').value === false) {
      this.formdata.append('onSteam', '0');
    }
    if (this.editgameform.get('AgeRating').value) {
      this.formdata.append('AgeRating', this.editgameform.get('AgeRating').value.toString());
    }
    if (this.editgameform.get('platform1').value === true) {
      this.formdata.append('platform[platform1]', 'PC');
    }
    if (this.editgameform.get('platform2').value === true) {
      this.formdata.append('platform[platform2]', 'XBOX ONE');
    }
    if (this.editgameform.get('platform3').value === true) {
      this.formdata.append('platform[platform3]', 'PC');
    }
    if (this.editgameform.get('platform4').value === true) {
      this.formdata.append('platform[platform4]', 'Nintendo Switch');
    }
    if (this.editgameform.get('platform5').value === true) {
      this.formdata.append('platform[platform5]', 'XBOX 360');
    }
    if (this.editgameform.get('platform6').value === true) {
      this.formdata.append('platform[platform6]', 'PS3');
    }
    this.game.updateGame(this.formdata, this.gameObject.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      response => {console.log('Success', response);  this.router.navigate(['admin']); },
      error => window.alert(error)
    );

  }

  deleteGame() {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '400px',
      height: '300px'
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res === 'true') {
        this.game.deleteGame(this.gameObject.id).subscribe( result => {
        }, err => {     this.snackbar.open('Game Deleted', 'Dismiss', {duration: 2000});
                        setTimeout(() => this.router.navigate(['admin/adminpage']), 2500); } );
      }
    });
  }



  Validate(game: Game) {
    const platform1on = game.platform.platform1 === 'PC';
    const platform2on = game.platform.platform2 === 'XBOX ONE';
    const platform3on = game.platform.platform3 === 'PS4';
    const platform4on = game.platform.platform4 === 'Nintendo Switch';
    const platform5on = game.platform.platform5 === 'Xbox 360';
    const platform6on = game.platform.platform6 === 'PS3';
    const onSteambool = Boolean(game.onSteam);
    this.editgameform.patchValue({
      gameName: game.gameName,
      gameDescription: game.gameDescription,
      gameTrailer: game.gameTrailer,
      gamePublisher: game.gamePublisher,
      gameReleaseDate: game.gameReleaseDate,
      platform1: platform1on,
      platform2: platform2on,
      platform3: platform3on,
      platform4: platform4on,
      platform5: platform5on,
      platform6: platform6on,
      onSteam: onSteambool,
      AgeRating: game.AgeRating,
      steamId: game.steamId,
    });

  }
}

