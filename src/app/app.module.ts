import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginRegisterService} from './services/login-register.service';
import {AuthGuard} from './auth.guard';
import {MaterialModule} from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import {AdminGuard} from './admin.guard';
import {TokenInterceptorService} from './token-interceptor.service';
import {GameService} from './services/game.service';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CustomDialogComponent,
    ErrorDialogComponent,
  ],
  entryComponents: [CustomDialogComponent, ErrorDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [LoginRegisterService, AuthGuard,  {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}, AdminGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
