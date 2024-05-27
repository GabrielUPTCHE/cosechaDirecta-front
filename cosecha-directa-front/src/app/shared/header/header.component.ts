import { Component, OnInit, Signal, effect } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  isHideHeader: Signal<boolean>;
  loggedUser: User;
  items: MenuItem[] | undefined;
  prodcutsCartSize: number = 0;

  itemsProducer = [
    {
      label: 'Crear producto',
      icon: 'pi pi-plus',
      routerLink: ['dashboard-usuario/crear-producto'],
    },
    {
      label: 'Pedidos',
      icon: 'pi pi-truck',
      routerLink: ['dashboard-usuario/pedidos'],
    },
  ];

  itemsBussines = [
    {
      label: 'Carrito',
      icon: 'pi pi-shopping-cart',
      routerLink: ['dashboard-usuario/carrito-de-compras'],
      badge: this.prodcutsCartSize.toString(),
    },
    {
      label: 'Pedidos',
      icon: 'pi pi-truck',
      routerLink: ['dashboard-usuario/pedidos'],
    },
    
  ];


  constructor(
    private breadcrumbService: BreadcrumbService, 
    private userService: UserServiceService, 
    private router: Router, 
    ) 
    {
      this.router.events.subscribe(response => {
        this.ngOnInit();
      })  
    }
    
    ngOnInit(): void {
      this.loggedUser = this.userService.getLoggedUser().user;
      const cart: Cart = JSON.parse(localStorage.getItem('productsCart'));
      this.itemsBussines[0].badge = cart.productsCart.length.toString();
      if (this.loggedUser?.role === 'N') {
    }
    this.isHideHeader = this.breadcrumbService.isHideHeader;
  }

  editUser(): void {
    this.router.navigate(['dashboard-usuario/editar-usuario'])
  }

}
