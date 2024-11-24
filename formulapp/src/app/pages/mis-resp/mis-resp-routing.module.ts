import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisRespPage } from './mis-resp.page';

const routes: Routes = [
  {
    path: '',
    component: MisRespPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisRespPageRoutingModule {}
