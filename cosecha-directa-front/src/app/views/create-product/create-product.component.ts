import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SharedModule } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { StorageFirebaseService } from 'src/app/services/firebase/storage-firebase.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-create-product',
  providers: [MessageService],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit{

  form: FormGroup = new FormGroup({
    productName: new FormControl('Cebolla'),
    variety: new FormControl('Larga'),
    description: new FormControl('Cebolla de suelo acido'),
    timePeriodSize: new FormControl('6'),
    unitMeasure: new FormControl('lb'),
    timePeriodType: new FormControl('mensual'),
  });
  submitted = false;
  unitMeasures: any[];
  periodTypes: any[];
  periodSizes: any[];
  productImages: File[];
  loggedUser:User;
  isLoading: boolean = false;

  constructor(
    private producService: ProductService, 
    private userService: UserServiceService,
    private firebaseService: StorageFirebaseService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: Router,
  ){}

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser().user;
    this.initsForm();
    this.producService.getUnitMeasures().subscribe(response =>{
      this.unitMeasures = response;
    });
    this.producService.getPeriodTypes().subscribe(response =>{
      this.periodTypes = response;
    })
  }

  async onSubmit(): Promise<any> {
    this.isLoading = true;
    this.submitted = true;
    if (this.form.invalid) {
      this.showAlert('error', 'Error en los campos', 'Por favor completa todos los campos correctamente.');
      this.isLoading = false;
      return;
    }
    const product = this.getProductForm();
    const createdProduct = await firstValueFrom(this.producService.createProduct(product));
    if (this.productImages?.length > 0) {
      const username = this.loggedUser.username;
      this.firebaseService.uploadProductImages(createdProduct.id_product, username, createdProduct.product_name, this.productImages).then(response => {
        this.firebaseService.getImagesProduct(createdProduct.id_product, username, createdProduct.product_name).then(uploadedImages => {
          this.producService.createProductImages(createdProduct.id_product, uploadedImages).subscribe(response => {
            this.isLoading = false;
            this.route.navigate(['dashbord-productor'])
          })
        }
      ).catch(()=> this.isLoading = false)
    }).catch(()=> this.isLoading = false)
    }
  }


  getProductForm() :Product {
    const product:Product = {
      product_name: this.form.value['productName'],
      product_images: [],
      time_period_size: this.form.value['timePeriodSize'],
      time_period_type: this.form.value['timePeriodType'],
      unit_measure: this.form.value['unitMeasure'],
      variety:this.form.value['variety'],
      description: this.form.value['description']
    } 
    return product;
  }


  initsForm() :void {
    this.form = this.formBuilder.group(
      {
        productName: ['Cebolla', 
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)
          ]
        ],
        variety: ['Larga',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)
          ]
        ],
        unitMeasure:['Lb', 
          [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(100)
          ]
        ],
        description: ['Cebolla de suelo acido', 
          [
            Validators.maxLength(200)
          ]
        ],
        timePeriodSize: ['6',
          [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(10)
          ]
        ],
        timePeriodType: ['Mensual', 
          [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(45)
          ]
        ],
      },
      
    );
  }

  showAlert( severity:string, summary:string, detail:string,) {
    this.messageService.add({ key:'toast-3',severity: severity, summary:summary , detail: detail  });
  }

  get f(): { [key: string]: AbstractControl  } {
    return this.form.controls;
  }

  onSelect(event:any){
    this.productImages = event.currentFiles;
  }
  onRemove(event:any){
    this.productImages = this.productImages.filter(element => element !== event.file);
  }

  onCancel(event:any){
    this.productImages = [];
  }

  cancelCreate():void{

  }

  selectDropdown(event: any): void {
    this.producService.getPeriodSizes(event.value).subscribe(response => {
      this.periodSizes = response;
      this.form.patchValue({
        timePeriodSize: response[0].value,
      });
    })
  }

}
