import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RegisterUserComponent } from './register-user/register-user.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DirectivesModule } from '../directives/directives.module';
import { ToastModule } from 'primeng/toast';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from '../shared/shared.module';
import { LoginViewComponent } from './login-view/login-view.component';


@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginViewComponent
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
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DirectivesModule, 
    ToastModule,
    ProgressSpinnerModule,
    SharedModule,
  ]
})
export class ViewsModule { }
