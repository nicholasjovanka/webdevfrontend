import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../services/game.service';
import {Observable, Subject} from 'rxjs';
import {FormControl , Validators, FormBuilder} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';
import {Gamepaginate} from '../Interfaces/gamepaginate';
import {Game} from '../Interfaces/game';
import {MatTableDataSource} from '@angular/material/table';
import {any} from 'codelyzer/util/function';
import {types} from 'util';
import { MatSort, MatSortModule} from '@angular/material/sort';
import {BrowserModule} from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
}
