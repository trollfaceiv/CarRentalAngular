import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';
import { SharedModuleModule } from 'src/app/shared/shared.module.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    VehicleInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    HttpClientModule
  ],
  exports:[
    VehicleInfoComponent
  ]
})
export class VehicleModule { }
