import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MaterialModule} from '../../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
