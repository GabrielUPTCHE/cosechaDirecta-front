import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  product: Product;
   responsiveOptions: any[] | undefined;
   images: any[] | undefined;

  constructor(private productService: ProductService , private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.productService.getProduct(params['id']).subscribe(product =>{
        this.product = product;
        this.images  = this.getImages();
      })
    })
  }

  getImages(): string[] {
    return this.product.product_images.map(element => element.url_image)
  }


}
