import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRentComponent } from './components/new-rent/new-rent.component';
import { RentListComponent } from './components/rent-list/rent-list.component';



@NgModule({
  declarations: [NewRentComponent,
  RentListComponent],
  imports: [
    CommonModule
  ],
  exports:[
    NewRentComponent,
    RentListComponent
  ]
})
export class RentModule { }
