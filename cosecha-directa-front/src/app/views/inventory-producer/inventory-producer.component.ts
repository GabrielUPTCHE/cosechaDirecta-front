import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-inventory-producer',
  templateUrl: './inventory-producer.component.html',
  styleUrl: './inventory-producer.component.scss'
})
export class InventoryProducerComponent implements OnInit{
  
  inventory: Product[] = [];
  isLoading:boolean = false;

  constructor(private productService: ProductService, private userService: UserServiceService, private router: Router){}

  ngOnInit(): void {
    this.refreshInventory();
  }

  getPeriodType(product:any):string{
    const {time_period_type, time_period_size} = product;
    if (time_period_type === 'mensual' && time_period_size === '1') return  'Mensual';
    if (time_period_type === 'mensual' && time_period_size !== '1') return  `Cada ${time_period_size} meses` ;
    if (time_period_type === 'semanal' && time_period_size === '1') return  'Semanal';
    if (time_period_type === 'semanal' && time_period_size !== '1') return  `Cada ${time_period_size} semanas` ;
    if (time_period_type === 'diario' && time_period_size === '1') return  'Diario';
    if (time_period_type === 'diario' && time_period_size !== '1') return `Cada ${time_period_size} dias` ;
    return '';
  }

  editProduct(id:number) {
    this.router.navigate(['dashboard-usuario/inventario/editar-producto', id])
  }

  deleteProduct(id_product:number): void {
    this.isLoading = true;
    this.productService.deleteProduct(id_product).subscribe( response =>{
      this.refreshInventory();
    })
  }

  refreshInventory():void {
    const userId = this.userService.getLoggedUser().user.id_user;
    this.productService.getInventoryProductsByUser(userId).subscribe( inventory =>{
      this.inventory = inventory;
      this.isLoading = false;
    } )
  }


}
