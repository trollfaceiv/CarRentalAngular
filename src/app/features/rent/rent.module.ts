import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRentComponent } from './components/new-rent/new-rent.component';
import { RentListComponent } from './components/rent-list/rent-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared/shared.module.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NewRentComponent,
  RentListComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModuleModule,
    RouterModule
  ],
  exports:[
    NewRentComponent,
    RentListComponent
  ]
})
export class RentModule { }
