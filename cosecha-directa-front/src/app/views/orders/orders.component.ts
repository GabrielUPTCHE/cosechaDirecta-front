import { Component, OnInit } from '@angular/core';
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

  constructor(private salesServices: SalesService, private userService: UserServiceService) {}

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser().user;
    this.salesServices.getSales(this.loggedUser.id_user).subscribe( response =>{
      this.orders = response;
      console.log('responseee:', response);
    })
  }

}
