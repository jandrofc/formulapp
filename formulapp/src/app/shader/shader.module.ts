import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from './forms-question/text/text.component';
import { SelectOneComponent } from './forms-question/select-one/select-one.component';



@NgModule({
  declarations: [HeaderComponent,FooterComponent,CustomInputComponent,TextComponent,SelectOneComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [HeaderComponent,FooterComponent,CustomInputComponent,ReactiveFormsModule,TextComponent,SelectOneComponent]
})
export class ShaderModule { }
