import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { LoadingScreenComponent } from './loadingScreen/loading-screen/loading-screen.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [  HeaderComponent, FooterComponent, LoadingScreenComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    ProgressSpinnerModule
  ],
  exports:[
    LoadingScreenComponent
  ]
})
export class SharedModule { }
