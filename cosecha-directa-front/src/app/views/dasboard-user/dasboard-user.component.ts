import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user/user-service.service';


@Component({
  selector: 'app-dasboard-user',
  templateUrl: './dasboard-user.component.html',
  styleUrl: './dasboard-user.component.scss',
  providers:[MessageService,DialogService]
})
export class DasboardUserComponent  implements OnInit{

  loggedUser: User;

  constructor(private router: Router, private userService: UserServiceService, private messageService: MessageService){}

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser().user;
    const updateProduct = localStorage.getItem('updatedProduct');
    const payCart = localStorage.getItem('payCart');

    if (updateProduct) {
      setTimeout(() => {
        this.showAlert('success', 'Edicion de producto', 'Se ha realizado la edicion de producto correctamente')
        localStorage.removeItem('updatedProduct')
      }, 5);

    }
    console.log('aaaa')
    if (payCart) {
      console.log('entrooo')
      setTimeout(() => {
        this.showAlert('success', 'Pago realizado', 'Se ha realizado el pedido a los productos del pedido')
        localStorage.removeItem('payCart')
      }, 5);
    }
  }

  navigateTo(route): void {
    this.router.navigate([route]);
  }

  showAlert( severity:string, summary:string, detail:string,) {
    this.messageService.add({ key:'4',severity: severity, summary:summary , detail: detail  });
  }


}
