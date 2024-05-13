import { Injectable, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { PageRoute } from 'src/app/models/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  items = signal<MenuItem[] | undefined>(undefined)
  
  home = signal<MenuItem | undefined>(undefined);
  isHideBreadcrumb =signal<boolean>(false);
  isHideHeader = signal<boolean>(true);
  isHideFooter = signal<boolean>(true);

  constructor() { 
  }

  setMenuItems(items:MenuItem[]){
    this.items.set(items);
  }

  hideBreadcrumb(status:boolean):void{
    this.isHideBreadcrumb.set(status);
  }

  setHideFooter(status:boolean){
    this.isHideFooter.set(status);
  }
}
