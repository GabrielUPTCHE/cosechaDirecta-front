import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleDetail } from 'src/app/models/sales';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit{
  
  salesDetails: SaleDetail[];

  constructor(private saleService: SalesService, private activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params =>{
      if (params['id_sale']) {
        this.saleService.getSalesDetail(params['id_sale']).subscribe( response => {
          this.salesDetails = response;
        })
      }
    })
  }

}
