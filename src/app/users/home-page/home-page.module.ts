import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    NgxYoutubePlayerModule.forRoot(),
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class HomePageModule { }
