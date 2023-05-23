import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SharedModuleModule } from './shared/shared.module.module';
import { FooterComponent } from './core/components/footer/footer.component';
import { VehicleModule } from './features/vehicle/vehicle.module';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './features/user/components/user-list/user-list.component';
import { UserInfoComponent } from './features/user/components/user-info/user-info.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/services/auth.guard';
import { NewRentComponent } from './features/rent/components/new-rent/new-rent.component';
import { RentListComponent } from './features/rent/components/rent-list/rent-list.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    UserListComponent,
    UserInfoComponent,
    LoginComponent,
    NewRentComponent,
    RentListComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModuleModule,
    VehicleModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
