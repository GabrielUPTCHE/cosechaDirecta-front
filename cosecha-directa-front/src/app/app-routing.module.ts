import { NgModule, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { MainPageComponent } from './views/main-page/main-page/main-page.component';

const routes: Routes = [
  {path:'', component:LoginViewComponent},
  {path:'registrar-usuario', component:RegisterUserComponent},
  {path:'pagina-principal', component:MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

 }
