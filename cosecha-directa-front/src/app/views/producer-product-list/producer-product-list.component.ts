import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-producer-product-list',
  templateUrl: './producer-product-list.component.html',
  styleUrl: './producer-product-list.component.scss'
})
export class ProducerProductListComponent implements OnInit {

  products: Product[];

  constructor( private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe( response =>{
      this.products = response;
      console.log("products:", this.products)
    })    
  }


  
}
