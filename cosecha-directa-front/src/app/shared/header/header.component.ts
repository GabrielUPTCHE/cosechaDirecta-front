import { Component, OnInit, Signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/user';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  isHideHeader: Signal<boolean>;
  loggedUser:User;
  items: MenuItem[] | undefined;

  constructor(private breadcrumbService: BreadcrumbService, private userService: UserServiceService, private router: Router){}

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser().user;    
    this.items = [
        {
            label: 'Crear producto',
            icon: 'pi pi-palette',
            routerLink:['dashbord-productor/crear-producto'],
           /*  items: [
                {
                    label: 'Installation',
                    route: '/login'
                },
                {
                    label: 'Configuration',
                    route: '/login'
                }
            ] */
        },
        {
            label: 'Programmatic',
            icon: 'pi pi-link',
            command: () => {
                this.router.navigate(['/login']);
            }
        },
        {
            label: 'External',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Angular',
                    url: 'https://angular.io/'
                },
                {
                    label: 'Vite.js',
                    url: 'https://vitejs.dev/'
                }
            ]
        }
    ];
      this.isHideHeader = this.breadcrumbService.isHideHeader;
  }


}
