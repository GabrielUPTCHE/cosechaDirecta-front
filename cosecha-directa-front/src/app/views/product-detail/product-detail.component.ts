import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalAddCartComponent } from 'src/app/components/modal-add-cart/modal-add-cart.component';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product/product.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';

@Component({
  selector: 'app-product-detail',
  standalone:true,
  imports:[PrimengModule],
  providers:[ DialogService, MessageService],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  ref: DynamicDialogRef | undefined;
  product: Product;
  responsiveOptions: any[] | undefined;
  images: any[] | undefined;
  loggedUser: User;

  constructor(
    private productService: ProductService , 
    private route: ActivatedRoute,
    private messageService: MessageService,
    private dialogService: DialogService,
    private userService: UserServiceService
  ) 
  {}

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser().user;
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

  addCart(): void {
    this.ref = this.dialogService.open(ModalAddCartComponent, {width:'500px', height:'400px', header: '¿Cuantas unidades deseas ordenar?', data: this.product });
    this.ref.onClose.subscribe(response => {
      if (response) {
        this.showAlert('success','Producto Añadido','Se ha añadido el producto al carrito.')
      }
    })
  }

  showAlert( severity:string, summary:string, detail:string,) {
    this.messageService.add({ key:'5',severity: severity, summary:summary , detail: detail  });
  }

}
