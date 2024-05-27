import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale, SaleDTO } from 'src/app/models/sales';
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

}
