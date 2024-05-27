import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';

import { SharedModule } from '../shared/shared.module';
import { LoginViewComponent } from './login-view/login-view.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProducerProductListComponent } from './producer-product-list/producer-product-list.component';
import { ComponentsModule } from '../components/components.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { InventoryProducerComponent } from './inventory-producer/inventory-producer.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DasboardUserComponent } from './dasboard-user/dasboard-user.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailProductComponent } from './order-detail-product/order-detail-product.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginViewComponent,
    CreateProductComponent,
    DasboardUserComponent,
    ProducerProductListComponent,
    InventoryProducerComponent,
    EditProductComponent,
    ShoppingCartComponent,
    PaymentComponent,
    OrdersComponent,
    OrderDetailComponent,
    OrderDetailProductComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule, 
    SharedModule,
    ComponentsModule,
    PrimengModule
  ],
  providers:[
  ]
})
export class ViewsModule { }
