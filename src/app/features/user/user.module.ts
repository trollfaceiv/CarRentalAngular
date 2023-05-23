import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserListComponent } from './components/user-list/user-list.component';



@NgModule({
  declarations: [UserInfoComponent,
  UserListComponent],
  imports: [
    CommonModule
  ],
  exports:[
    UserInfoComponent,
    UserListComponent
  ]
})
export class UserModule { }
