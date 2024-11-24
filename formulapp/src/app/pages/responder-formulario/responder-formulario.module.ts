import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponderFormularioPageRoutingModule } from './responder-formulario-routing.module';

import { ResponderFormularioPage } from './responder-formulario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponderFormularioPageRoutingModule
  ],
  declarations: [ResponderFormularioPage]
})
export class ResponderFormularioPageModule {}
