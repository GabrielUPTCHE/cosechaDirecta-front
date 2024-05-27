// src/app/components/payment/payment.component.ts
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { SaleDTO, SaleDetail } from 'src/app/models/sales';
import { User } from 'src/app/models/user';
import { SalesService } from 'src/app/services/sales/sales.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  userLogged: User;

  constructor(private saleService: SalesService, private userService: UserServiceService) {}

  ngOnInit(): void {
      this.userLogged = this.userService.getLoggedUser().user;
  }

   valuesSelectCuotes = [
    {value:1, name:'1'},
  ]
   documentTypes = [
    {value:'CC', name:'CC'},
  ]
  
  banks = [
    {value:'Davivienda', name:'Davivienda'},
    {value:'Bancolombia', name:'Bancolombia'},
    {value:'Banco Occidente', name:'Banco Occidente'},
  ]

  selectedCuote: any;
  selectedDocumentType: any;
  selectedBank: any;

  doPayment(): void {
    this.saleService.createSale(this.getSaleDto()).subscribe( response =>{
    })
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