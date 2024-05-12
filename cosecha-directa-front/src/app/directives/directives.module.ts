import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './only-numbers.directive';



@NgModule({
  declarations: [
    OnlyNumberDirective
  ],
  exports:[
    OnlyNumberDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
