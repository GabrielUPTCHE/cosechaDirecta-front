import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view/login-view.component';
import { MainPageComponent } from './views/main-page/main-page/main-page.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { ProductsViewComponent } from './views/product-details/products-details.component';

const routes: Routes = [
  {path:'', component:LoginViewComponent},
  {path:'pagina-principal', component:MainPageComponent},
  {path:'registrar-usuario', component:RegisterUserComponent},
  {path:'products', component:ProductsViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
