import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreparadorFormsPageRoutingModule } from './preparador-forms-routing.module';

import { PreparadorFormsPage } from './preparador-forms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreparadorFormsPageRoutingModule
  ],
  declarations: [PreparadorFormsPage]
})
export class PreparadorFormsPageModule {}
