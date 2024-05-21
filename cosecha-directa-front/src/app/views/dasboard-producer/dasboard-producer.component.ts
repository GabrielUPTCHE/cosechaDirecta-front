import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-dasboard-producer',
  templateUrl: './dasboard-producer.component.html',
  styleUrl: './dasboard-producer.component.scss'
})
export class DasboardProducerComponent {

  constructor(private router: Router){}

  navigateTo(route): void {
    this.router.navigate([route]);
  }

}
