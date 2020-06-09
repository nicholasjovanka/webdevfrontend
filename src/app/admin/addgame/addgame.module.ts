import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddgameRoutingModule } from './addgame-routing.module';
import { AddgameComponent } from './addgame.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [AddgameComponent],
    imports: [
        CommonModule,
        AddgameRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDatepickerModule
    ]
})
export class AddgameModule { }
