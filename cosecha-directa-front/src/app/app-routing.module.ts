import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view/login-view.component';
import { ProductsViewComponent } from './views/product-details/products-details.component';

const routes: Routes = [
  {path:'login', component:LoginViewComponent},
  {path:'products', component:ProductsViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
