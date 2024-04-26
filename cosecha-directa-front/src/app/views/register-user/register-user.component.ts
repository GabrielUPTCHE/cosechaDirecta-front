import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent implements OnInit{

  typeUserCreate: string;

  userName: string;
  password: string;

  constructor(private userService: UserServiceService){}

  ngOnInit(): void {
    this.typeUserCreate = this.userService.typeUserCreate;
    console.log(this.typeUserCreate);
  }
  
  validateTypeUser(): string {
    return this.typeUserCreate === "bussines"? "negocio": "agricultor";
  }

}
