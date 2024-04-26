import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-view',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsViewComponent implements OnInit {

  userName:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
