import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewModule } from './views/login-view/login-view.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginViewModule ,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  exports:[
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
