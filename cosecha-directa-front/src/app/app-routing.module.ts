import { NgModule, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { MainPageComponent } from './views/main-page/main-page/main-page.component';
import { Product } from './views/main-page/main-page/product';
import { ProductsComponent } from './views/products/products.component';

const routes: Routes = [
  
  {path:'Pagina-Principal', component:LoginViewComponent},
  {path:'', component:MainPageComponent}, 
  {path:'registrar-usuario', component:RegisterUserComponent},
  {path:'Detalles-Producto',component:ProductsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

 }
