import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import { AddgameComponent } from './addgame/addgame.component';
import { MainadminpageComponent } from './mainadminpage/mainadminpage.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [AdminComponent, MainadminpageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class AdminModule { }
