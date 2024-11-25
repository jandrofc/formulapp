import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompartirFormsPage } from './compartir-forms.page';

const routes: Routes = [
  {
    path: '',
    component: CompartirFormsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompartirFormsPageRoutingModule {}
