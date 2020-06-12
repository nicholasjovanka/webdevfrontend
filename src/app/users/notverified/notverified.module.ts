import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotverifiedRoutingModule } from './notverified-routing.module';
import { NotverifiedComponent } from './notverified.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [NotverifiedComponent],
  imports: [
    CommonModule,
    NotverifiedRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class NotverifiedModule { }
