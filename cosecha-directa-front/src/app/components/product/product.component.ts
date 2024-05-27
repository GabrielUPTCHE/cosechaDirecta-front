import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input('product') product: Product;

  constructor(private router: Router) {}

  getPeriodType():string{
      if (this.product.time_period_type === 'mensual' && this.product.time_period_size === '1') return  'mes';
      if (this.product.time_period_type === 'mensual' && this.product.time_period_size !== '1') return  'meses';
      if (this.product.time_period_type === 'semanal' && this.product.time_period_size === '1') return  'semana';
      if (this.product.time_period_type === 'semanal' && this.product.time_period_size !== '1') return  'semanas';
      if (this.product.time_period_type === 'diario' && this.product.time_period_size === '1') return  'dia';
      if (this.product.time_period_type === 'diario' && this.product.time_period_size !== '1') return  'dias';
      return '';
  }


  navigateToProduct() : void {
    this.router.navigate(['/dashboard-usuario/lista-general-productos/producto', this.product.id_product]);
  }

  

}
