import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cosecha-directa-front';

  constructor ( private router: Router, private breadcrumbService: BreadcrumbService, private primengConfig: PrimeNGConfig,
   ){}

  ngOnInit() {
    const productsCart = localStorage.getItem('productsCart');
    if (!productsCart) {
      const initialCart = {
        productsCart:[]
      }
      localStorage.setItem('productsCart',JSON.stringify(initialCart))
    }
    this.primengConfig.ripple = true;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.isHideBreacrumb(event) ) {
        this.breadcrumbService.hideBreadcrumb(false);
      }
      if (event instanceof NavigationEnd && !this.isHideBreacrumb(event)) {
        this.generateBreadcrumb(event)
      }
      if(event instanceof NavigationEnd){
        this.validateHeaderHide(event);
      }
    });
  }

  isHideBreacrumb(event: NavigationEnd): boolean {
    return event?.url === '/' || event?.url === '/login'
  }

  generateBreadcrumb(event: NavigationEnd): void {
    let items = event?.url.split('/')
    let route = '';
    let menuItems = items.map((element, index) => {
      if (element === '') {
        return {label:'login', routerLink:'login'}
      }else{
        route += `${element}/`
        console.log('el route:', route);
        return {label:element, routerLink:route}
      }
    })
    this.breadcrumbService.hideBreadcrumb(true);
    this.breadcrumbService.setMenuItems(menuItems)
  }

  validateHeaderHide(event: NavigationEnd): void {
    if(event?.url === '/registrar-usuario' || this.isHideBreacrumb(event) ){
      this.breadcrumbService.isHideFooter.set(true);
      this.breadcrumbService.isHideHeader.set(true);
    }else{
      this.breadcrumbService.isHideFooter.set(false);
      this.breadcrumbService.isHideHeader.set(false);

    }
  }

  
}
