import { Component, OnInit, Signal, effect } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  isHideHeader: Signal<boolean>;

  constructor(private breadcrumbService: BreadcrumbService){}

  ngOnInit(): void {
      this.isHideHeader = this.breadcrumbService.isHideHeader;
  }
}
