import { Component, OnInit } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Component({
  standalone:true,
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {

  ngOnInit(): void {
      const decodeUser = jwtDecode(sessionStorage.getItem('token'));
      console.log('decode user:', decodeUser);
  }

}
