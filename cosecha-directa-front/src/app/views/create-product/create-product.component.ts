import { Component, OnInit, effect, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SharedModule } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Inventory, Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { StorageFirebaseService } from 'src/app/services/firebase/storage-firebase.service';
import { LocationService } from 'src/app/services/location/location.service';
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
    productName: new FormControl(''),
    variety: new FormControl(''),
    description: new FormControl(''),
    timePeriodSize: new FormControl(''),
    unitMeasure: new FormControl(''),
    timePeriodType: new FormControl(''),
    department: new FormControl(''),
    city: new FormControl(''),
    amount: new FormControl(0),
    price: new FormControl(0),
    beginPeriodDate: new FormControl(new Date())
  });
  submitted = false;
  unitMeasures: any[];
  periodTypes: any[];
  periodSizes: any[];
  productImages: File[];
  loggedUser:User;
  isLoading: boolean = false; 
  departments: any[] = [];
  selectedDepartment = signal('');
  cities: any[] = [];
  selectedCity: string = '';
  minDate: Date = new Date();

  constructor(
    private producService: ProductService, 
    private userService: UserServiceService,
    private firebaseService: StorageFirebaseService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: Router,
    private locationService: LocationService,
  ){
    effect(() => {
      this.locationService.getCitiesByDepartment(this.selectedDepartment()).subscribe(response => {
        this.cities = response;
      })
    })
  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser().user;
    this.initsForm();
    this.producService.getUnitMeasures().subscribe(response =>{
      this.unitMeasures = response;
    });
    this.producService.getPeriodTypes().subscribe(response =>{
      this.periodTypes = response;
    })
    this.locationService.getDepartments().subscribe((response) => {
      this.departments = response;
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
    const username = this.loggedUser.username;
      this.firebaseService.uploadProductImages(createdProduct.id_product, username, createdProduct.product_name, this.productImages).then(response => {
        this.firebaseService.getImagesProduct(createdProduct.id_product, username, createdProduct.product_name).then(uploadedImages => {
          this.producService.createProductImages(createdProduct.id_product, uploadedImages).subscribe(response => {
            this.producService.createInventory(
              this.getInventoryForm(createdProduct.id_product)
            ).subscribe(response =>{
              this.isLoading = false;
              this.route.navigate(['dashboard-usuario'])
            }, error => this.isLoading = false)
          },error => this.isLoading = false )
        }
      ).catch(()=> this.isLoading = false)
    }).catch(()=> this.isLoading = false)
  }


  getProductForm() :any {
    const product = {
      product_name: this.form.value['productName'],
      product_images: [],
      time_period_size: this.form.value['timePeriodSize'],
      time_period_type: this.form.value['timePeriodType'],
      unit_measure: this.form.value['unitMeasure'],
      variety:this.form.value['variety'],
      description: this.form.value['description'],
      location_id: this.form.value['city'],
      begin_period_date: this.form.value['beginPeriodDate']
    } 
    return product;
  }

  getInventoryForm(id_product: number): Inventory | any{
    const inventory: Inventory | any = {
      id_product:id_product,
      id_user: this.loggedUser.id_user,
      quantity: Number(this.form.value['amount']),
      unit_price: this.form.value['price'],
      next_delivery_date: this.form.value['beginPeriodDate'],
      time_period_type: this.form.value['timePeriodType'],
    }
    return inventory;
  }


  initsForm() :void {
    this.form = this.formBuilder.group(
      {
        productName: ['', 
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)
          ]
        ],
        variety: ['',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)
          ]
        ],
        unitMeasure:['', 
          [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(100)
          ]
        ],
        description: ['', 
          [
            Validators.maxLength(200)
          ]
        ],
        timePeriodSize: ['',
          [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(10)
          ]
        ],
        timePeriodType: ['', 
          [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(45)
          ]
        ],
        department:['', Validators.required],
        city:['', Validators.required],
        amount:[0, [Validators.required]],
        price: [0, [Validators.required]],
        beginPeriodDate: [null, [Validators.required]]
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
