import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainPageComponent,
    RegisterUserComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    DynamicDialogModule,
    FormsModule,
  ]
})
export class ViewsModule { }
