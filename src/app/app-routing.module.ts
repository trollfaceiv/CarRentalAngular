import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { VehicleInfoComponent } from './features/vehicle/components/vehicle-info/vehicle-info.component';
import { NewVehicleComponent } from './features/vehicle/components/new-vehicle/new-vehicle.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/services/auth.guard';
import { RoleGuard } from './core/services/role.guard';
import { NewRentComponent } from './features/rent/components/new-rent/new-rent.component';
import { RentListComponent } from './features/rent/components/rent-list/rent-list.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'vehicle-info', component: VehicleInfoComponent },
  { path: 'edit-vehicle/:id', component: NewVehicleComponent, canActivate: [RoleGuard] },
  { path: 'edit-vehicle', component: NewVehicleComponent, canActivate: [RoleGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'rent-vehicle/:id', component: NewRentComponent, canActivate: [AuthGuard]},
  { path: 'show-rents', component: RentListComponent, canActivate: [RoleGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }