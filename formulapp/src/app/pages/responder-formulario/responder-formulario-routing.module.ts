import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponderFormularioPage } from './responder-formulario.page';

const routes: Routes = [
  {
    path: '',
    component: ResponderFormularioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponderFormularioPageRoutingModule {}
