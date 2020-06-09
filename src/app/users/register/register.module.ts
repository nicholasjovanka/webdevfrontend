import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {MaterialModule} from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
