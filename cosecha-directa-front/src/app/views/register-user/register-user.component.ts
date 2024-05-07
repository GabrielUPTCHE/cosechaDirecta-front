import { Component, OnInit, effect, signal } from '@angular/core';
import { User } from 'src/app/models/user';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { LocationService } from 'src/app/services/location/location.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent implements OnInit {

  typeUserCreate: string;
  user: User = { fullname: '', username: '', password: '', role: '', direction: '', email: '', phone: '', id_number: '' };
  repeatPassword: string;
  departments: any[] = [];
  selectedDepartment = signal('');
  cities: any[] = [];
  selectedCity: string = '';

  constructor(
    private userService: UserServiceService,
    private breadcrumbService: BreadcrumbService,
    private locationService: LocationService
  ) {
    effect(() => {
      this.locationService.getCitiesByDepartment(this.selectedDepartment()).subscribe(response => {
        this.cities = response;
      })
    })
  }

  ngOnInit(): void {
    this.typeUserCreate = this.userService.typeUserCreate;
    this.breadcrumbService.hideBreadcrumb(true);
    this.breadcrumbService.setMenuItems([{ label: 'login', routerLink: '/' }, { label: `registro de ${this.validateTypeUser()}` }])
    this.locationService.getDepartments().subscribe((response) => {
      this.departments = response;
    })
  }

  validateTypeUser(): string {
    return this.typeUserCreate === "bussines" ? "negocio" : "agricultor";
  }

  validateRepeatPassword():boolean {
    return this.repeatPassword === this.user.password;
  }

}
