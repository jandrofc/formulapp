import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerFormsPage } from './ver-forms.page';

const routes: Routes = [
  {
    path: '',
    component: VerFormsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerFormsPageRoutingModule {}
