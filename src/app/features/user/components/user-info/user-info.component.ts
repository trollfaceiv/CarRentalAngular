import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/features/vehicle/models/vehicle.model';
import { VehicleService } from 'src/app/features/vehicle/services/vehicle.service';
import { MyHeaders } from 'src/app/shared/components/my-table/my-table.headers';
import { HeaderExtractorService } from 'src/app/shared/services/header-extractor.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MyButtonConfig } from 'src/app/shared/components/my-button/my-button.config';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  sendButton: MyButtonConfig =  { customCssClass: 'btn btn-primary mr-2', text: 'Invia', image: '' };
  saveButton: MyButtonConfig =  { customCssClass: 'btn btn-primary mr-2', text: 'Salva', image: '' };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private headerService: HeaderExtractorService,
    private router: Router) { }
   
  selectedUser!: User;
  attributes!: MyHeaders[];
  mockUser: User = new User();
  
  ngOnInit(): void {
    if(!this.exist()){
      this.selectedUser = new User();
    }
    else{this.getSelectedUser();
    }
    this.getAttributes();
  }

  exist(){
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  getAttributes() {
    this.attributes = this.headerService.extractHeadersFromClass(this.mockUser, ['Id', 'Nome', 'Cognome', 'Email','Password', 'Ruolo', 'Data di nascita']);
  }

  getSelectedUser() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(userId)
      .subscribe((user: User) => { this.selectedUser = user });
  }

  updateUser(){
    this.userService.updateUser(this.selectedUser).subscribe();
    this.router.navigate(['/user-list']);
  }

  saveUser(){
    this.userService.addUser(this.selectedUser).subscribe();
    this.router.navigate(['/user-list']);
  }
}
