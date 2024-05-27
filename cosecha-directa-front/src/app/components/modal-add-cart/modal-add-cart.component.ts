import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-modal-add-cart',
  templateUrl: './modal-add-cart.component.html',
  styleUrl: './modal-add-cart.component.scss'
})
export class ModalAddCartComponent implements OnInit {

  product: Product;
  orderProductsAmount:number = 1;
  cart: Cart;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig){}
  
  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('productsCart'));
    this.product = this.config.data; 
    
  }

  addProductToCart(): void {
    const index = this.cart.productsCart.findIndex(cartProduct => cartProduct.product.id_product === this.product.id_product);
    if (index !== -1) {
      this.cart.productsCart[index].orderQuantity = this.orderProductsAmount;
    } else {
      this.cart.productsCart.push({ product: this.product, orderQuantity: this.orderProductsAmount })
    }
    localStorage.setItem('productsCart', JSON.stringify(this.cart));
    this.ref.close(true);

  }

  close(): void{
    this.ref.close();
  }

}
