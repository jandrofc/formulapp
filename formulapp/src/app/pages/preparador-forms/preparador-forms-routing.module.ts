import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreparadorFormsPage } from './preparador-forms.page';

const routes: Routes = [
  {
    path: '',
    component: PreparadorFormsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreparadorFormsPageRoutingModule {}
