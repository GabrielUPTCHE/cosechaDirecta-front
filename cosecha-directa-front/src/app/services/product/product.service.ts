import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory, Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = `${environment.SERVER_URL}product`;

  constructor(private httpClient: HttpClient) { }

  getUnitMeasures(): Observable<any> {
    return this.httpClient.get<Observable<any>>(`${this.url}/unit-measures`) 
  }
  
  getPeriodTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/period-types`) 
  }
  
  getPeriodSizes(periodType:string): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/period-sizes/${periodType}`);
  }
  
  createProduct(product:Product): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/create-product`, product)
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.url}/update-product`, product) 
  }

  updateInventory(inventory: Inventory): Observable<Inventory> {
    return this.httpClient.put<Inventory>(`${this.url}/update-inventory`, inventory) 
  }
  
  createProductImages(productId:number, images: string[]): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/create-product-images`, {productId, images})
  }
  
  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/get-product/${productId}`);
  }
  
  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.url}/get-all-products`);
  }
  
  createInventory(inventory: Inventory): Observable<Inventory> {
    return this.httpClient.post<any>(`${this.url}/create-inventory`, {inventory})
  }

  getInventoryProductsByUser(id_user:number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/get-inventory/${id_user}`)
  }

}
