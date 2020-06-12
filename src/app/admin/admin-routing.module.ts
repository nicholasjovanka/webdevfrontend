import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AuthGuard} from '../auth.guard';
import {AddgameComponent} from './addgame/addgame.component';
import {MainadminpageComponent} from './mainadminpage/mainadminpage.component';
const routes: Routes = [{ path: '', component: AdminComponent , children: [
    {path: '', redirectTo: 'adminpage', pathMatch: 'full' },
    { path: 'adminpage', component: MainadminpageComponent},
    { path: 'addgame', loadChildren: () => import('./addgame/addgame.module').then(m => m.AddgameModule) },
    { path: 'editgame/:id', loadChildren: () => import('./editgame/editgame.module').then(m => m.EditgameModule) },
    { path: 'reviews/:id', loadChildren: () => import('./reviewlist/reviewlist.module').then(m => m.ReviewlistModule) },
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
