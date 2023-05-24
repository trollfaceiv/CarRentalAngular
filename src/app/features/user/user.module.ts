import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared/shared.module.module';



@NgModule({
  declarations: [UserInfoComponent,
  UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModuleModule
  ],
  exports:[
    UserInfoComponent,
    UserListComponent
  ]
})
export class UserModule { }
