import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamecomponentComponent } from './gamecomponent.component';

const routes: Routes = [{ path: '', component: GamecomponentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamecomponentRoutingModule { }
