import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import {AuthGuard} from '../auth.guard';
import {AdminGuard} from '../admin.guard';

const routes: Routes = [{ path: '', component: UsersComponent, children: [
    {path: '', redirectTo: 'homepage'},
    { path: 'homepage', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
    { path: 'userprofile/:name', loadChildren: () => import('./userprofile/userprofile.module').
      then(m => m.UserprofileModule), canActivate: [AuthGuard] },
    { path: 'gamelist', loadChildren: () => import('./gamelist/gamelist.module').then(m => m.GamelistModule) },
  ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
export const routingComponents = [UsersComponent];
