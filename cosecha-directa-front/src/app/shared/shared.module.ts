import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';



@NgModule({
  declarations: [  HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    BreadcrumbModule
  ],
  exports:[
  ]
})
export class SharedModule { }
