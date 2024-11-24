import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreparadorFormsPageRoutingModule } from './preparador-forms-routing.module';

import { PreparadorFormsPage } from './preparador-forms.page';
import { ShaderModule } from "../../shader/shader.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreparadorFormsPageRoutingModule,
    ShaderModule
],
  declarations: [PreparadorFormsPage]
})
export class PreparadorFormsPageModule {}
