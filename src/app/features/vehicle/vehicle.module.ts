import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';
import { SharedModuleModule } from 'src/app/shared/shared.module.module';
import { HttpClientModule } from '@angular/common/http';
import { NewVehicleComponent } from './components/new-vehicle/new-vehicle.component';
@NgModule({
  declarations: [
    VehicleInfoComponent,
    NewVehicleComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[
    VehicleInfoComponent,
    NewVehicleComponent
  ]
})
export class VehicleModule { }
