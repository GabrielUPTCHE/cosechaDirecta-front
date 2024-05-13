import { Component, OnInit, Signal } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  isHideFooter:Signal<boolean>;

  constructor(private breadcrumbService: BreadcrumbService){}

  ngOnInit(): void {
    this.isHideFooter = this.breadcrumbService.isHideFooter;
  }

}
