import { Component, OnChanges, OnInit, SimpleChanges, effect, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  items = signal<MenuItem[] | undefined>(undefined);
  home = signal<MenuItem | undefined>(undefined);
  isHideBreadcrumb = signal<boolean | undefined>(undefined);

  constructor(private breadcrumbService: BreadcrumbService){
    this.items = breadcrumbService.items;
    this.home = breadcrumbService.home;  
    this.isHideBreadcrumb = breadcrumbService.isHideBreadcrumb;
  }
 

  
}
