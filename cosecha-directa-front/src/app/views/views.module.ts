import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';


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
    DividerModule,
    ButtonModule,
    RippleModule,
    DropdownModule
  ]
})
export class ViewsModule { }
