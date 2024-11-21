import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearformsPage } from './crearforms.page';

const routes: Routes = [
  {
    path: '',
    component: CrearformsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearformsPageRoutingModule {}
