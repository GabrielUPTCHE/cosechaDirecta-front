
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { UserServiceService } from './services/user/user-service.service';
import { ViewsModule } from './views/views.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PrimengModule } from './shared/primeng/primeng.module';
import {TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    HttpClientModule,
    ViewsModule,
    ComponentsModule,
    BrowserAnimationsModule,
    PrimengModule,
    provideFirebaseApp(() => initializeApp({"projectId":"cosecha-directa-storage","appId":"1:848494519374:web:1ea75e9270118859644f1f","storageBucket":"cosecha-directa-storage.appspot.com","apiKey":"AIzaSyBogRmkS1GybUhAe3XE5dNopgQ2hHmT8AE","authDomain":"cosecha-directa-storage.firebaseapp.com","messagingSenderId":"848494519374","measurementId":"G-EZ047G8H6V"})),
    provideStorage(() => getStorage()),
    
  ],
  exports:[
  ],
 
  providers: [UserServiceService, DialogService,TranslateService,TranslateStore,
    provideHttpClient(withInterceptors([AuthInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
