import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewlistComponent } from './reviewlist.component';

const routes: Routes = [{ path: '', component: ReviewlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewlistRoutingModule { }
