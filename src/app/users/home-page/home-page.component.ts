import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/game.service';
import {Game} from '../../Interfaces/game';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isloaded = false;
  constructor(private game: GameService, private router: Router) { }
  gameobject: Game[];
  fileArray: string[] = [];
  ngOnInit(): void {
    this.game.GetLatestGame().subscribe(
      res => {this.gameobject = res;
              this.gameobject.forEach( (e) => {
                this.game.getGameImage(e.id).subscribe( img => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = im => {this.fileArray.push(reader.result as string); this.isloaded = true};
          });
        });
      }
    );
  }
  getPlatform(game: Game) {
    let basestring = 'Platform :';
    if (game.platform) {
      if (game.platform.platform1) {
        basestring += ' ' + game.platform.platform1 + ' |';
      }
      if (game.platform.platform2) {
        basestring += ' ' + game.platform.platform2 + ' |';
      }
      if (game.platform.platform3) {
        basestring += ' ' + game.platform.platform3 + ' |';
      }
      if (game.platform.platform4) {
        basestring += ' ' + game.platform.platform4 + ' |';
      }
      if (game.platform.platform5) {
        basestring += ' ' + game.platform.platform5 + ' |';
      }
      if (game.platform.platform6) {
        basestring += ' ' + game.platform.platform6 + ' |';
      }
      return basestring;
    }
  }
  goToGame(game: Game) {
    this.router.navigate(['game', game.id, {name: game.gameName}]);
  }
}
