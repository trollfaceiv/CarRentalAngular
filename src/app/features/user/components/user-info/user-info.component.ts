import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/features/vehicle/models/vehicle.model';
import { VehicleService } from 'src/app/features/vehicle/services/vehicle.service';
import { MyHeaders } from 'src/app/shared/components/my-table/my-table.headers';
import { HeaderExtractorService } from 'src/app/shared/services/header-extractor.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MyButtonConfig } from 'src/app/shared/components/my-button/my-button.config';
import { AuthService } from 'src/app/core/services/auth.service';
import { MyTableConfig } from 'src/app/shared/components/my-table/my-table.config';
import { Rent } from 'src/app/features/rent/models/rent';
import { RentService } from 'src/app/features/rent/services/rent.service';

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
    private authService: AuthService,
    private router: Router,
    private rentService: RentService) { }
   
  selectedUser!: User;
  attributes!: MyHeaders[];
  mockUser: User = new User();
  isAdmin = this.authService.isAdmin();
  rentArray!: Rent[];
  
  rentUserTabHeaders: MyTableConfig<Rent> = new MyTableConfig(
    ['Id', "Data di inizio noleggio", 'Data di fine noleggio', 'ID veicolo', 'ID utente','Stato'],
    Rent,
    { defaultColumn: 'id', orderType: 'asc' },
    { columns: ['Stato'] },
    { itemPerPage: 5, itemPerPageOptions: [5, 10, 20, 50] },
    [] 
);

  ngOnInit(): void {
    if(!this.exist()){
      this.selectedUser = new User();
    }
    else{this.getSelectedUser()
    }
    this.getAttributes();
 
    
 
  }
 /*  transformArray(rents: Rent[]) {
    return rents.map((rent) => {
      const transformedRent = { ...rent };
  
      if ('userId' in transformedRent) {
        transformedRent.user = transformedRent.userId as number;
        delete transformedRent.userId;
      }
  
      if ('vehicleId' in transformedRent) {
        transformedRent.car = transformedRent.vehicleId as number;
        delete transformedRent.vehicleId;
      }
  
      return transformedRent;
    });
  } */
  getRents(){
    this.rentService.getRentByID(this.selectedUser.id).subscribe((rents: Rent[]) => {
      this.rentArray = rents
      this.rentArray = this.mapFunction(this.rentArray);
    });
  }
  mapFunction(rents: any[]){
    rents = rents.map(function (rent) {
      if (rent.car && rent.car.id !== undefined) {
        return {
          id: rent.id,
          startDate: rent.startDate,
          endDate: rent.endDate,
          car: rent.car.plateNumber,
          user: rent.user,
          approved: rent.approved
        };
      } else {
        return rent;
      }
    });
    return rents;
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
      .subscribe((user: User) => {
         this.selectedUser = user 
         this.getRents();});
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
