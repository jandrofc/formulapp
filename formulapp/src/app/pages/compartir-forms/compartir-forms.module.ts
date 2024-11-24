import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompartirFormsPageRoutingModule } from './compartir-forms-routing.module';

import { CompartirFormsPage } from './compartir-forms.page';
import { ShaderModule } from "../../shader/shader.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompartirFormsPageRoutingModule,
    ShaderModule
],
  declarations: [CompartirFormsPage]
})
export class CompartirFormsPageModule {}
