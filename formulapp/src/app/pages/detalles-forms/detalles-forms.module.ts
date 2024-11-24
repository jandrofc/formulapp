import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesFormsPageRoutingModule } from './detalles-forms-routing.module';

import { DetallesFormsPage } from './detalles-forms.page';
import { ShaderModule } from "../../shader/shader.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesFormsPageRoutingModule,
    ShaderModule
],
  declarations: [DetallesFormsPage]
})
export class DetallesFormsPageModule {}
