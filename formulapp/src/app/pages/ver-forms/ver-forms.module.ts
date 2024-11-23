import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerFormsPageRoutingModule } from './ver-forms-routing.module';

import { VerFormsPage } from './ver-forms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerFormsPageRoutingModule
  ],
  declarations: [VerFormsPage]
})
export class VerFormsPageModule {}
