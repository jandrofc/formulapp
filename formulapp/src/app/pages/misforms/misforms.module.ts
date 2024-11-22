import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisformsPageRoutingModule } from './misforms-routing.module';

import { MisformsPage } from './misforms.page';
import { ShaderModule } from 'src/app/shader/shader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisformsPageRoutingModule,
    ShaderModule,
  ],
  declarations: [MisformsPage]
})
export class MisformsPageModule {}
