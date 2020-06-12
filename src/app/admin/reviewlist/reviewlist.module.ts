import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewlistRoutingModule } from './reviewlist-routing.module';
import { ReviewlistComponent } from './reviewlist.component';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Observable, Subject} from 'rxjs';
import {FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule} from '@angular/forms';
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
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [ReviewlistComponent],
  imports: [
    CommonModule,
    ReviewlistRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class ReviewlistModule { }
