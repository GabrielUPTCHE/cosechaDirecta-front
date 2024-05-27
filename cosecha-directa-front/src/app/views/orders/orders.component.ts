import { Component, OnInit } from '@angular/core';
import { SaleDetail } from 'src/app/models/sales';
import { User } from 'src/app/models/user';
import { SalesService } from 'src/app/services/sales/sales.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  orders:any;
  loggedUser:User;
  salesDetails: SaleDetail[] = [];

  constructor(private salesServices: SalesService, private userService: UserServiceService) {}

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser().user;
    this.salesServices.getSales(this.loggedUser.id_user).subscribe( response =>{
      this.orders = response;
    })
    if (this.loggedUser.role === 'P') {
      this.salesServices.getSalesDetailByProducer(this.loggedUser.id_user).subscribe(response =>{
        this.salesDetails = response;
      })
    }
  }

}
