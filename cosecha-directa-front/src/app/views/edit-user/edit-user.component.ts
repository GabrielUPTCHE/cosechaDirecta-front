import { Component, effect, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { StorageFirebaseService } from 'src/app/services/firebase/storage-firebase.service';
import { LocationService } from 'src/app/services/location/location.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import Validation from 'src/app/utils/validation';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  providers:[MessageService]
})
export class EditUserComponent {
  typeUserCreate: string;
  repeatPassword: string;
  departments: any[] = [];
  selectedDepartment = signal('');
  cities: any[] = [];
  selectedCity: string = '';
  uploadImageUser: File;
  isLoading:boolean = false;
  disabledForm: boolean = true;

  form: FormGroup = new FormGroup({
    fullname: new FormControl('Gabriel Infante'),
    username: new FormControl('gabriel11'),
    direction: new FormControl('cra 11 - #2 - 2'),
    email: new FormControl('ginfante099@gmail.com'),
    password: new FormControl('Parafusso11'),
    confirmPassword: new FormControl('Parfusso11'),
    phone: new FormControl('3222471439'),
    idNumber: new FormControl('1051212500'),
    department: new FormControl(''),
    city: new FormControl(''),
    imgUser: new FormControl(undefined),
    description: new FormControl(''),
  });
  submitted = false

  constructor(
    private userService: UserServiceService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private firebaseService:StorageFirebaseService
  ) {
    effect(() => {
      this.locationService.getCitiesByDepartment(this.selectedDepartment()).subscribe(response => {
        this.cities = response;
      })
    })
  }

  ngOnInit(): void {
    this.initsForm();
    this.typeUserCreate = localStorage.getItem('userTypeCreate')
    this.locationService.getDepartments().subscribe((response) => {
      this.departments = response;
    })
  }

  onSelect(event:any) {
    this.uploadImageUser = event.currentFiles[0];
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onSubmit(): void {
    /* this.submitted = true;
    if (this.form.invalid) {
      this.showAlert(
        'error',
        'Error en los campos',
        'Por favor completa todos los campos correctamente.'
      );
      return;
    }
    this.isLoading = true;
    const modelUser = this.createUserModel();
    if (this.uploadImageUser) {
      this.firebaseService.uploadFile(modelUser.username,this.uploadImageUser).then(response =>{
        this.firebaseService.getDownloadUrlByUsername(modelUser.username).then(url_img =>{
          this.handleCreateUser(modelUser, url_img)
        })
      })
    }else{
      this.handleCreateUser(modelUser)
    } */
  }

  handleCreateUser(modelUser: User, url_img:string = '') :void {
    modelUser.user_img = url_img;
    this.userService.createUser(modelUser).subscribe(
      (response) => {
        this.validateCreateResponse(response);
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      })
  }

   createUserModel(): User {
    const {username, fullname, idNumber, phone, email, direction, password, city  } = this.form.value;
    return{username,fullname,id_number:idNumber,phone,email,direction,password,location:city,role: this.getRole(),user_img:''}
  }


  getRole(): string{
    const typeUserCreate = localStorage.getItem('userTypeCreate');
    if (typeUserCreate === "agricultor") return 'P'
    if (typeUserCreate === "negocio") return 'N'
    return 'N'
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  showAlert( severity:string, summary:string, detail:string,) {
    this.messageService.add({ key:'toast-1',severity: severity, summary:summary , detail: detail  });
  }

  validateCreateResponse(response:any):void {
    if (response.status === 'error') {
      this.showAlert(response.status, response.detail,  response.message)
      return;
    }
    if (response.status === 'success') {
      localStorage.setItem('generatedUser',JSON.stringify({severity:response.status,detail:response.detail, message:response.message}))
      this.router.navigate(['login'])
      return;
    }

  }

  cancelCreate(): void{
    this.router.navigate(['dashboard-usuario'])
  }

  initsForm() :void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', 
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(200)
          ]
        ],
        username: ['',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100),
          ]
        ],
        direction:['', 
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100)
          ]
        ],
        email: ['', 
          [
            Validators.required, 
            Validators.email,
            Validators.maxLength(100)
          ]
        ],
        password: ['',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100)
          ]
        ],
        confirmPassword: ['', 
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100)
          ]
        ],
        phone:['', 
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10)
          ]
        ],
        idNumber:['', 
          [
            Validators.required,
            Validators.minLength(10),
          ]
        ],
        
        department:['', Validators.required],
        city:['', Validators.required],
        imgUser:[undefined],
        description:['', 
          [
            Validators.maxLength(100)
          ]
        ],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
}
