import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cosecha-directa-front';

  constructor ( private router: Router, private breadcrumbService: BreadcrumbService){}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event?.url === '/') {
        this.breadcrumbService.hideBreadcrumb(false);
      }
      if (event instanceof NavigationEnd && event?.url !== '/') {
        let items = event?.url.split('/')
        console.log('items:', items);
        let menuItems = items.map((element, index) => {
          if (element === '') {
            return {label:'login', routerLink:'/'}
          }else{
            return {label:element, routerLink:element}
          }
        })
        console.log(menuItems )
        this.breadcrumbService.hideBreadcrumb(true);
        this.breadcrumbService.setMenuItems(menuItems)
      /* this.breadcrumbService.setMenuItems([{ label: 'login', routerLink: '/' }, { label: `registro de ${this.validateTypeUser()}` }]) */
      }
    });
  }
}
