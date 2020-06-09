import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditgameRoutingModule } from './editgame-routing.module';
import { EditgameComponent } from './editgame.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [EditgameComponent],
  imports: [
    CommonModule,
    EditgameRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule,
  ]
})
export class EditgameModule { }
