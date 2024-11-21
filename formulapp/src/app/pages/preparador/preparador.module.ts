import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreparadorPageRoutingModule } from './preparador-routing.module';

import { PreparadorPage } from './preparador.page';
import { ShaderModule } from 'src/app/shader/shader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreparadorPageRoutingModule,
    ShaderModule,
  ],
  declarations: [PreparadorPage]
})
export class PreparadorPageModule {}
