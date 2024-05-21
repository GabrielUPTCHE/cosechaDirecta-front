import { NgModule, OnInit } from '@angular/core';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { MainPageComponent } from './views/main-page/main-page/main-page.component';
import { DasboardProducerComponent } from './views/dasboard-producer/dasboard-producer.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './views/create-product/create-product.component';
import { ProducerProductListComponent } from './views/producer-product-list/producer-product-list.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';

const routes: Routes = [
  
  {path:'', component:MainPageComponent}, 
  {path:'login', component:LoginViewComponent},
  {path:'registrar-usuario', component:RegisterUserComponent},
  {path:'dashbord-productor', component:DasboardProducerComponent},
  {path:'dashbord-productor/crear-producto', component:CreateProductComponent},
  {path:'dashbord-productor/lista-general-productos', component:ProducerProductListComponent},
  {path:'dashbord-productor/lista-general-productos/producto/:id', component:ProductDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

 }
