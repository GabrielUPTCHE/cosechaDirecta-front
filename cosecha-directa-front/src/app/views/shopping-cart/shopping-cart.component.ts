import { Component, OnInit, WritableSignal, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, ProductCart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { SaleDTO, SaleDetail } from 'src/app/models/sales';
import { User } from 'src/app/models/user';
import { SalesService } from 'src/app/services/sales/sales.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

  cart: Cart;
  removeProduct = signal(0);
  setListProductCart: WritableSignal<ProductCart>;
  userLogged: User;
  isLoading:boolean = false;

  constructor(private router: Router, private saleService: SalesService, private userService: UserServiceService){
    effect(()=>{
      if (this.removeProduct() !== 0) {
        this.removeProductCart(this.removeProduct());
      }
      if(this.setListProductCart()){
        this.updateProductCart(this.setListProductCart());
      }
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('productsCart'));
    this.userLogged = this.userService.getLoggedUser().user;
    this.setListProductCart= signal(this.cart.productsCart[0]??{product:null,orderQuantity:0})
  }

  payAll(): void {
    this.isLoading = true;
    this.saleService.createSale(this.getSaleDto()).subscribe( response =>{
      this.isLoading = false;
      this.router.navigate(['dashboard-usuario']);
      localStorage.setItem('payCart', 'true');
      localStorage.removeItem('productsCart');
    })
  }

  removeProductCart(id_product:number): void {
    const updateCart = this.cart.productsCart.filter(productCart => productCart.product.id_product !== id_product);
    this.cart.productsCart = updateCart;
  }

  getTotalPay(): number {
    return this.cart.productsCart.reduce((acc, productCart) => {
      return acc + (productCart.orderQuantity * productCart.product.inventory[0].unit_price);
    }, 0);
  }

  updateProductCart(productCart: ProductCart): void {
    const index =  this.cart.productsCart.findIndex((productCart) => productCart.product.id_product === productCart.product.id_product);
    this.cart.productsCart[index] = productCart;
  }
  
  getSaleDto(): SaleDTO {
    return {
      sale:{
        delivery_status:'P',
        id_user_bussines:this.userLogged.id_user,
        is_paid:1,
        payment_method:'P',
        sale_date: new Date(),
        sale_status: 'A'
      },
      salesDetail: this.getSalesDetail()
    }
  }

  getSalesDetail(): SaleDetail[] {
    const productCart: Cart = JSON.parse(localStorage.getItem('productsCart'));
    const salesDetail = productCart.productsCart.map((element) => {
      return {
        unit_price: element.product.inventory[0].unit_price,
        amount: element.orderQuantity,
        id_sales: 0,
        id_product:  element.product.id_product,
        id_user_producer: element.product.inventory[0].user.id_user
      }
    });
    return salesDetail;
  }

}
