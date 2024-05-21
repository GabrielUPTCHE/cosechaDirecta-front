import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { ProductComponent } from './product/product.component';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    ModalRegisterComponent,
    ProductComponent
  ],
  exports:[
    ProductComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    CardModule
  ]
})
export class ComponentsModule { }
