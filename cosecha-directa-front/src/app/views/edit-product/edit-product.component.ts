import { Component, effect, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Inventory, Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { StorageFirebaseService } from 'src/app/services/firebase/storage-firebase.service';
import { LocationService } from 'src/app/services/location/location.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-edit-product',
  providers: [MessageService],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {


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
    beginPeriodDate: new FormControl(null)
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
  productId: number;
  minDate: Date = new Date();

  constructor(
    private producService: ProductService, 
    private userService: UserServiceService,
    private firebaseService: StorageFirebaseService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: Router,
    private locationService: LocationService,
    private activeRoute: ActivatedRoute
  ){
    effect(() => {
      this.locationService.getCitiesByDepartment(this.selectedDepartment()).subscribe(response => {
        this.cities = response;
      })
    })
  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser().user;
    this.producService.getUnitMeasures().subscribe(response =>{
      this.unitMeasures = response;
    });
    this.producService.getPeriodTypes().subscribe(response =>{
      this.periodTypes = response;
    })
    this.locationService.getDepartments().subscribe((response) => {
      this.departments = response;
    })
    this.activeRoute.params.subscribe(params =>{
      this.productId = params['id'];
      this.producService.getProduct(Number(this.productId)).subscribe( product =>{
        this.initsForm(product);
        this.producService.getPeriodSizes(product.time_period_type).subscribe(periodSize => {
          this.periodSizes = periodSize;
          this.form.patchValue({
            beginPeriodDate:new Date(product.begin_period_date),
            amount:product.inventory[0].quantity,
            price:product.inventory[0].unit_price,
            department: product.location.location_parent,
            city: product.location.id_location,

          });
          
        })
      })      
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
    this.producService.updateProduct(product).subscribe( response =>{
      this.producService.updateInventory(this.getInventoryForm()).subscribe( inventory =>{
        this.navigateTo();
        localStorage.setItem('updatedProduct', 'true');
        this.isLoading = false;
      }, error => {
        this.isLoading = false
      })
    }, error =>{
      this.isLoading = false;
    } )
  }


  getProductForm() :any {
    const product = {
      id_product: this.productId,
      product_name: this.form.value['productName'],
        time_period_size: this.form.value['timePeriodSize'],
      time_period_type: this.form.value['timePeriodType'],
      unit_measure: this.form.value['unitMeasure'],
      variety:this.form.value['variety'],
      description: this.form.value['description'],
      location_id: this.form.value['city'],
      begin_period_date: this.form.value['beginPeriodDate'],
    } 
    return product;
  }
  
  getInventoryForm(): Inventory | any {
    const inventory: Inventory | any = {
      id_product:this.productId,
      id_user: this.loggedUser.id_user,
      quantity: Number(this.form.value['amount']),
      unit_price: this.form.value['price'],
      next_delivery_date: this.form.value['beginPeriodDate'],
      time_period_type: this.form.value['timePeriodType'],
    }
    return inventory;
  }

  navigateTo():void {
    this.route.navigate(['dashboard-usuario'])
  }


  initsForm(product: Product) :void {
    this.form = this.formBuilder.group(
      {
        productName: [product.product_name, 
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)
          ]
        ],
        variety: [product.variety,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)
          ]
        ],
        unitMeasure:[product.unit_measure, 
          [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(100)
          ]
        ],
        description: [product.description, 
          [
            Validators.maxLength(200)
          ]
        ],
        timePeriodSize: [product.time_period_size,
          [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(10)
          ]
        ],
        timePeriodType: [product.time_period_type, 
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
        beginPeriodDate: [new Date(product.begin_period_date), [Validators.required]]
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
