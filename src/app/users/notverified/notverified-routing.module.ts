import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotverifiedComponent } from './notverified.component';

const routes: Routes = [{ path: '', component: NotverifiedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotverifiedRoutingModule { }
