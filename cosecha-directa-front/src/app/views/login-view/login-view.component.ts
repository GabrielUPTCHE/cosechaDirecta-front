import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalRegisterComponent } from 'src/app/components/modal-register/modal-register.component';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss',
  providers:[MessageService,DialogService]
})
export class LoginViewComponent implements OnInit {

  userName: string = '';
  password: string = '';

  classInputs: string = '';
  ref: DynamicDialogRef | undefined;

  public isErrorLogin: boolean = false;

  constructor(
    private messageService: MessageService,
    private userService: UserServiceService, 
    private router: Router, 
    private dialogService: DialogService,
  ) { 
    this.messageService.add({key:'2', summary:'error', detail:'a', severity:'error'})

  }
  
  ngOnInit(): void {
    const generatedUser = localStorage.getItem('generatedUser');
    if (generatedUser) {
      setTimeout(() => {
      const generatedUserObject = JSON.parse(generatedUser);
      this.showAlert(generatedUserObject.severity, generatedUserObject.detail, generatedUserObject.message )
      localStorage.removeItem('generatedUser')
      }, 5);
    }
  }


  validateUser(): void {
    this.classInputs = "";
    this.userService.validateUser(this.userName, this.password).subscribe(response => {
      sessionStorage.setItem('token', response.token);
      this.router.navigate(['pagina-principal'])
      this.router.getCurrentNavigation
    }, error => {
      this.classInputs = "ng-invalid ng-dirty";
    }
    )
  }

  showRegisterDialog(): void {
    this.ref = this.dialogService.open(ModalRegisterComponent, {header: '¿Eres agricultor o negocio?', width: '40%'});
  }

  naviageRegister(): void {
    this.router.navigate(['registrar-usuario'])
  }

  showAlert( severity:string, summary:string, detail:string,) {
    this.messageService.add({key:'2', severity: severity, summary:summary , detail: detail  });
  }


}
