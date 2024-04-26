import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ModalRegisterComponent } from './modal-register/modal-register.component';



@NgModule({
  declarations: [
    ModalRegisterComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule
  ]
})
export class ComponentsModule { }
