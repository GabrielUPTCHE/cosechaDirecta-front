import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale, SaleDTO, SaleDetail } from 'src/app/models/sales';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  url:string = environment.SERVER_URL;

  constructor(private httpClient: HttpClient) { }

  createSale(sale:SaleDTO): Observable<Sale> {
    return this.httpClient.post<Sale>(`${this.url}payments/create-sale`, sale);
  }

  getSales(id_user_bussines: number) :Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}payments/get-sales/${id_user_bussines}`)
  }

  getSalesDetail(id_sales: number): Observable<SaleDetail[]> {
    return this.httpClient.get<SaleDetail[]>(`${this.url}payments/get-sale-details/${id_sales}`)
  }

  getSalesDetailByProducer(id_producer: number): Observable<SaleDetail[]> {
    return this.httpClient.get<SaleDetail[]>(`${this.url}payments/get-sale-details-by-producer/${id_producer}`)
  }

}
