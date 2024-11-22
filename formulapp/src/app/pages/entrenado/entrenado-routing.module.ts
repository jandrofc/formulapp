import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenadoPage } from './entrenado.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenadoPageRoutingModule {}
