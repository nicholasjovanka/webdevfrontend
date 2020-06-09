import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamecomponentRoutingModule } from './gamecomponent-routing.module';
import { GamecomponentComponent } from './gamecomponent.component';
import {MaterialModule} from '../../material/material.module';


@NgModule({
  declarations: [GamecomponentComponent],
  imports: [
    CommonModule,
    GamecomponentRoutingModule,
    MaterialModule
  ]
})
export class GamecomponentModule { }
