import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Route, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalRegisterComponent } from 'src/app/components/modal-register/modal-register.component';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  providers:[DialogService]
})
export class LoginViewComponent implements OnInit {

  userName: string = '';
  password: string = '';

  classInputs: string = '';
  ref: DynamicDialogRef | undefined;

  public isErrorLogin: boolean = false;

  constructor(private userService: UserServiceService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {

  }


  validateUser(): void {
    this.classInputs = "";
    this.userService.validateUser(this.userName, this.password).subscribe(response => {
      this.router.navigate(['pagina-principal'])
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


}
