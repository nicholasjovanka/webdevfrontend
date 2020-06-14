import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Observable, Subject} from 'rxjs';
import {FormControl , Validators, FormBuilder} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';
import {Gamepaginate} from '../../Interfaces/gamepaginate';
import {Game} from '../../Interfaces/game';
import {MatTableDataSource} from '@angular/material/table';
import {any} from 'codelyzer/util/function';
import {types} from 'util';
import { MatSort, MatSortModule} from '@angular/material/sort';
import {BrowserModule} from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit, OnDestroy {
  constructor(private gamesservice: GameService, private route: ActivatedRoute, private router: Router) { }
  gameName = new FormControl('');
  gameSub: Observable<string[]>;
  displayedColumns: string[] = ['id', 'gameName'];
  dataUnformated: Game[];
  dataSource ;
  loaded = false;
  private ngUnsubscribe = new Subject();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    // this.gameSub = this.gameName.valueChanges.pipe(debounceTime(425), distinctUntilChanged(),
    //   switchMap( res => this.gamesservice.AutoSuggest(res)));
    this.gamesservice.GetAllGame().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res: Game[]) => {if (res) {this.dataUnformated = res;
                                  this.dataSource = new MatTableDataSource(this.dataUnformated);
                                  this.loaded = true; this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator;
                                  console.log(this.dataSource); } }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  log(element) {
    console.log(element);
  }
  applyFilter($event) {
    this.dataSource.filter = $event.target.value.toLowerCase();
  }
  goToGame(row) {
    if (row.id) {
      this.router.navigate(['game', row.id, {name: row.gameName}]);
    }
  }
}
