import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {GamesComponent} from './components/games/games.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {UserprofileComponent} from './components/userprofile/userprofile.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [{path: '', redirectTo: 'home', pathMatch: 'full'} ,
  {path: 'home' , component: HomePageComponent},
  {path: 'games' , component: GamesComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'userprofile/:name' , component: UserprofileComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
export const routingComponents = [HomePageComponent, NotFoundComponent, GamesComponent,
  RegisterComponent, LoginComponent, UserprofileComponent];
