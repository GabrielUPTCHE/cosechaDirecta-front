
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewModule } from './views/login-view/login-view.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './services/user/user-service.service';
import { ViewsModule } from './views/views.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ComponentsModule } from './components/components.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SharedModule } from './shared/shared.module';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    LoginViewModule ,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    HttpClientModule,
    ViewsModule,
    DynamicDialogModule,
    ComponentsModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    DividerModule,
    DropdownModule
  ],
  exports:[
  ],
 
  providers: [UserServiceService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
