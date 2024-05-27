import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss'
})
export class ProductCartComponent implements OnInit {

  @Input('product') product: Product;
  @Input('orderQuantity') orderQuantity: number;
  @Input('removeProduct') removeProduct: WritableSignal<number>;
  @Input('setListProductCart') setListProductCart: WritableSignal<ProductCart>;

  constructor(private router: Router) {}

  ngOnInit(): void {
      
  }

  goToProductDetail() :void {
    this.router.navigate(['dashboard-usuario/lista-general-productos/producto', this.product.id_product])
  }

  removeToCart(): void {
    this.removeProduct.set(this.product.id_product);
  }

  onChangeInput(event: any) {
    console.log('aaaaa', this.setListProductCart);
    this.setListProductCart.set({product:this.product, orderQuantity: this.orderQuantity})
  }

}
