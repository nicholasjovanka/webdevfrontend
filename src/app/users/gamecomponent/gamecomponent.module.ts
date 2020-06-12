import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamecomponentRoutingModule } from './gamecomponent-routing.module';
import { GamecomponentComponent } from './gamecomponent.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [GamecomponentComponent],
  imports: [
    CommonModule,
    GamecomponentRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MatDividerModule,
    NgxYoutubePlayerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class GamecomponentModule { }

