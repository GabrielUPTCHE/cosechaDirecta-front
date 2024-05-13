import { NgModule, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { LoginViewComponent } from './views/login-view/login-view.component';

const routes: Routes = [
  
  {path:'', component:LoginViewComponent},
  {path:'Pagina-Principal', component:MainPageComponent}, 

  {path:'registrar-usuario', component:RegisterUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

 }
