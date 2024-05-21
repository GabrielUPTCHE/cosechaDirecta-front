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
    let menuItems = items.map((element, index) => {
      if (element === '') {
        return {label:'login', routerLink:'/'}
      }else{
        return {label:element, routerLink:element}
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
