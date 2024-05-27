import { Component, Input, OnInit, input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { SaleDetail } from 'src/app/models/sales';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-order-detail-product',
  templateUrl: './order-detail-product.component.html',
  styleUrl: './order-detail-product.component.scss'
})
export class OrderDetailProductComponent implements OnInit {

  @Input('saleDetail')
  saleDetail: SaleDetail;
  product: Product;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
      this.productService.getProduct(this.saleDetail.id_product).subscribe(response =>{
        this.product = response;
      })
  }

  goToProductDetail() :void {
    this.router.navigate(['dashboard-usuario/lista-general-productos/producto', this.product.id_product])
  }



}
