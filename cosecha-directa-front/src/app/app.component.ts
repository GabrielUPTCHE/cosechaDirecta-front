import { Component, OnInit } from '@angular/core';
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
        console.log('La ruta ha cambiado:', event.url);
      }
    });
  }
}
