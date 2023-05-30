import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SharedModuleModule } from './shared/shared.module.module';
import { FooterComponent } from './core/components/footer/footer.component';
import { VehicleModule } from './features/vehicle/vehicle.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/services/auth.guard';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { UserModule } from './features/user/user.module';
import { RentModule } from './features/rent/rent.module';
import { RegisterComponent } from './core/components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModuleModule,
    UserModule,
    VehicleModule,
    HttpClientModule,
    FormsModule,
    RentModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
