import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileComponent } from './userprofile.component';
import {MaterialModule} from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [UserprofileComponent],
  imports: [
    CommonModule,
    UserprofileRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class UserprofileModule { }
