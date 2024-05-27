import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { ProductComponent } from './product/product.component';
import { CardModule } from 'primeng/card';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { ModalAddCartComponent } from './modal-add-cart/modal-add-cart.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    ModalRegisterComponent,
    ProductComponent,
    ModalAddCartComponent,
    ProductCartComponent,
    OrderComponent
  ],
  exports:[
    ProductComponent,
    ProductCartComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    CardModule,
    PrimengModule
  ]
})
export class ComponentsModule { }
