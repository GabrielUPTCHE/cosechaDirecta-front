import { NgModule, OnInit } from '@angular/core';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { MainPageComponent } from './views/main-page/main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './views/create-product/create-product.component';
import { ProducerProductListComponent } from './views/producer-product-list/producer-product-list.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { InventoryProducerComponent } from './views/inventory-producer/inventory-producer.component';
import { EditProductComponent } from './views/edit-product/edit-product.component';
import { DasboardUserComponent } from './views/dasboard-user/dasboard-user.component';
import { ShoppingCartComponent } from './views/shopping-cart/shopping-cart.component';
import { PaymentComponent } from './views/payment/payment.component';
import { OrdersComponent } from './views/orders/orders.component';
import { OrderDetailComponent } from './views/order-detail/order-detail.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';

const routes: Routes = [
  
  {path:'', component:MainPageComponent}, 
  {path:'login', component:LoginViewComponent},
  {path:'registrar-usuario', component:RegisterUserComponent},
  {path:'dashboard-usuario', component:DasboardUserComponent},
  {path:'dashboard-usuario/editar-usuario', component:EditUserComponent},
  {path:'dashboard-usuario/crear-producto', component:CreateProductComponent},
  {path:'dashboard-usuario/lista-general-productos', component:ProducerProductListComponent},
  {path:'dashboard-usuario/lista-general-productos/producto/:id', component:ProductDetailComponent},
  {path:'dashboard-usuario/inventario', component:InventoryProducerComponent},
  {path:'dashboard-usuario/inventario/editar-producto/:id', component:EditProductComponent},
  {path:'dashboard-usuario/carrito-de-compras', component:ShoppingCartComponent},
  {path:'dashboard-usuario/completar-pago', component:PaymentComponent},
  {path:'dashboard-usuario/pedidos', component:OrdersComponent},
  {path:'dashboard-usuario/pedidos/detalle/:id_sale', component:OrderDetailComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

 }
