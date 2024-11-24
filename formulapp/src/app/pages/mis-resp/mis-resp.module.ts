import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisRespPageRoutingModule } from './mis-resp-routing.module';

import { MisRespPage } from './mis-resp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisRespPageRoutingModule
  ],
  declarations: [MisRespPage]
})
export class MisRespPageModule {}
