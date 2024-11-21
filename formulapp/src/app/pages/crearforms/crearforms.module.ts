import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearformsPageRoutingModule } from './crearforms-routing.module';

import { CrearformsPage } from './crearforms.page';
import { ShaderModule } from 'src/app/shader/shader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearformsPageRoutingModule,
    ShaderModule,
  ],
  declarations: [CrearformsPage]
})
export class CrearformsPageModule {}
