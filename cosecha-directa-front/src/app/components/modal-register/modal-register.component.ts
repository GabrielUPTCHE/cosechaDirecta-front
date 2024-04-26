import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrl: './modal-register.component.scss',
})
export class ModalRegisterComponent {

  constructor(private router: Router, private ref: DynamicDialogRef, private userService: UserServiceService){}

  navigateRegister(typeUser:string){
    this.ref.close();
    this.userService.typeUserCreate = typeUser;
    this.router.navigate(['registrar-usuario'])
  }

}
