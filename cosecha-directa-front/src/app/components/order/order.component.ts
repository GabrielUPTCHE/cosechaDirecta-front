import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sale, SaleDetail } from 'src/app/models/sales';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  @Input('order')
  order: Sale;
  orderDetails: SaleDetail[];
  
  constructor(private salesService: SalesService, private router: Router) {}

  ngOnInit(): void {
      this.salesService.getSalesDetail(this.order.id_sale).subscribe(response =>{
        this.orderDetails = response;
      })
  }

  formatOrderStatus() :string {
    if (this.order.sale_status === 'A') return 'Abrobada';
    if (this.order.sale_status === 'R') return 'Rechazada';
    return ''
  }

  formatIsPaid() :string {
    if (this.order.is_paid === 1) return 'Pago';
    if (this.order.is_paid === 0) return 'No Pago';
    return ''
  }

  formatDelivery() :string {
    if (this.order.delivery_status === 'P') return 'Pendiente';
    if (this.order.delivery_status === 'C') return 'En Camino';
    if (this.order.delivery_status === 'E') return 'En Envio';
    return ''
  }

  getTotal(): number {

    return this.orderDetails.reduce((acc, saleDetail) => {
      return acc + (saleDetail.amount * saleDetail.unit_price);
    }, 0);
  }
  

  moreDetails(): void {
    this.router.navigate(['dashboard-usuario/pedidos/detalle', this.order.id_sale ])
  }


}
