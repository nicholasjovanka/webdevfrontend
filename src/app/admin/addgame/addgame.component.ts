import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {Game} from '../../Interfaces/game';
import {formatDate} from '@angular/common';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {MatNativeDateModule} from '@angular/material/core';
@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit, OnDestroy {
  imageFile;
  gameImage: string;
  constructor(private fb: FormBuilder, private game: GameService, @Inject(LOCALE_ID) private locale, private router: Router) { }
  addgameform: FormGroup;
  formdata: FormData;
  private ngUnsubscribe = new Subject();
  ngOnInit(): void {
    this.addgameform = this.fb.group({
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
    this.addgameform.get('onSteam').valueChanges.subscribe( res => {if (res === false) {
    this.addgameform.get('AgeRating').disable();
    }
                                                                    console.log(res);
    }
    );
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  checksize($event) {
    const file = $event.target.files[0];
    this.imageFile = file;
    if ((file.size / 1204 / 1204) > 1) {
      window.alert('Maximum File size is 1024 Kilobytes');
      this.addgameform.patchValue({
        gameImage : null
      });
    } else {
      const reader = new FileReader();
      reader.onload = e => this.gameImage = reader.result as string;
      reader.readAsDataURL(file);
    }

  }
  submitGame() {
   //  const gameobject: Game = {
   //   gameName: this.addgameform.get('gameName').value,
   //   gameDescription: this.addgameform.get('gameDescription').value,
   //   platform: {
   //   },
   // };
    this.formdata = new FormData();
    this.formdata.append('gameName', this.addgameform.get('gameName').value,);
    this.formdata.append('gameDescription', this.addgameform.get('gameDescription').value);
    if (this.addgameform.get('gameReleaseDate').value) {
     this.formdata.append('gameReleaseDate', formatDate(this.addgameform.get('gameReleaseDate').value, 'yyyy-MM-dd', this.locale));
    }
    if (this.addgameform.get('gameImage').value !== null || this.addgameform.get('gameImage').value !== '') {
      this.formdata.append('gameImage', this.imageFile);
    }
    if (this.addgameform.get('gameTrailer').value) {
      this.formdata.append('gameTrailer', this.addgameform.get('gameTrailer').value);
    }
    if (this.addgameform.get('gamePublisher').value) {
      this.formdata.append('gamePublisher', this.addgameform.get('gamePublisher').value);
    }
    if (this.addgameform.get('onSteam').value) {
      this.formdata.append('onSteam', '1');
      this.formdata.append('steamId', this.addgameform.get('steamId').value);
    }
    if (this.addgameform.get('onSteam').value === false) {
      this.formdata.append('onSteam', '0');
    }
    if (this.addgameform.get('AgeRating').value) {
      this.formdata.append('AgeRating', this.addgameform.get('AgeRating').value.toString());
    }
    if (this.addgameform.get('platform1').value === true) {
      this.formdata.append('platform[platform1]', 'PC');
    }
    if (this.addgameform.get('platform2').value === true) {
      this.formdata.append('platform[platform2]', 'XBOX ONE');
    }
    if (this.addgameform.get('platform3').value === true) {
      this.formdata.append('platform[platform3]', 'PS4');
    }
    if (this.addgameform.get('platform4').value === true) {
      this.formdata.append('platform[platform4]', 'Nintendo Switch');
    }
    if (this.addgameform.get('platform5').value === true) {
      this.formdata.append('platform[platform5]', 'XBOX 360');
    }
    if (this.addgameform.get('platform6').value === true) {
      this.formdata.append('platform[platform6]', 'PS3');
    }
    this.game.AddGame(this.formdata).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      response => {console.log('Success', response);  this.router.navigate(['admin']); },
      error => console.log(error)
    );

  }
}
