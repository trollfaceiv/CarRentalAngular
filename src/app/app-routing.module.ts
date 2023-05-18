import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { VehicleInfoComponent } from './features/vehicle/components/vehicle-info/vehicle-info.component';

const routes: Routes = [
  {path: 'vehicle-info', component: VehicleInfoComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }