import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisformsPage } from './misforms.page';

const routes: Routes = [
  {
    path: '',
    component: MisformsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisformsPageRoutingModule {}
