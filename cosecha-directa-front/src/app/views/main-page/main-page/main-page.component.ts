import { Component ,OnInit, VERSION } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {

  constructor(private route: Router){}

  ngOnInit(): void {
      const decodeUser = jwtDecode(sessionStorage.getItem('token'));
  }

  navigate(url:string){
    this.route.navigate([url]);
  }

  
}