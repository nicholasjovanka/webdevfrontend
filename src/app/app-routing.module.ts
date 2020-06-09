import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {GamesComponent} from './components/games/games.component';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';
import { PreloadAllModules } from '@angular/router';
const routes: Routes = [
  { path: '', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  // {path: 'games' , component: GamesComponent},
  // {path: 'register' , component: RegisterComponent},
  // {path: 'userprofile/:name' , component: UserprofileComponent, canActivate: [AuthGuard]},
  // // {path: 'admin' , component: AdminPageComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard, AdminGuard]},
  {path: '**', component: NotFoundComponent}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
export const routingComponents = [NotFoundComponent, GamesComponent];
