import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule, routingComponents } from './users-routing.module';
import {MaterialModule} from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
