import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamelistRoutingModule } from './gamelist-routing.module';
import { GamelistComponent } from './gamelist.component';
import {AdminRoutingModule} from '../../admin/admin-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [GamelistComponent],
  imports: [
    CommonModule,
    GamelistRoutingModule,
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule,
  ]
})
export class GamelistModule { }
