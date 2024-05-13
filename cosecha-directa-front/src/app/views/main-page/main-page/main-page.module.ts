import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MainPageComponent} from './main-page.component';

import { DataViewModule } from 'primeng/dataview';

import { ProductService } from './product.service.js';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [BrowserModule, FormsModule, DataViewModule, HttpClientModule],
  declarations: [MainPageComponent],
  providers: [ProductService],
  bootstrap: [MainPageComponent],
})
export class AppModule {}