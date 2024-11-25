import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrenadoPageRoutingModule } from './entrenado-routing.module';

import { EntrenadoPage } from './entrenado.page';
import { ShaderModule } from 'src/app/shader/shader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrenadoPageRoutingModule,
    ShaderModule,
  ],
  declarations: [EntrenadoPage]
})
export class EntrenadoPageModule {}
