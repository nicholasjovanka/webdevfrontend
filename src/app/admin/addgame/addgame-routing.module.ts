import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddgameComponent } from './addgame.component';

const routes: Routes = [{ path: '', component: AddgameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddgameRoutingModule { }
