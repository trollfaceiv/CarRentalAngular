import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/features/user/models/user';
import { Vehicle } from 'src/app/features/vehicle/models/vehicle.model';
import { VehicleService } from 'src/app/features/vehicle/services/vehicle.service';
import { MyButtonConfig } from 'src/app/shared/components/my-button/my-button.config';
import { Rent } from '../../models/rent';
import { RentService } from '../../services/rent.service';

@Component({
  selector: 'app-new-rent',
  templateUrl: './new-rent.component.html',
  providers: [RentService],
  styleUrls: ['./new-rent.component.css']
})
export class NewRentComponent implements OnInit {

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private rentService: RentService
  ) { }

  ngOnInit(): void {
    this.getSelectedVehicle();
    this.getUserLogged();
    console.log("L'utenza loggata è: " + this.selectedUser.id + "Il veicolo selezionato è: " + this.selectedVehicle.id);
  }


  selectedVehicle!: Vehicle
  selectedUser!: User
  rentButton: MyButtonConfig = { customCssClass: 'btn btn-primary mr-2', text: 'Noleggia', image: '' };

  startDate!: Date;
  endDate!: Date;


  getSelectedVehicle() {
    const vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicleService.getVehicleById(vehicleId)
      .subscribe((vehicle: Vehicle) => { this.selectedVehicle = vehicle });
  }

  getUserLogged() {
    const savedUser = localStorage.getItem('loggedInUser');
    this.selectedUser = savedUser ? JSON.parse(savedUser) : null;
  }

  createRent() {
    const newRent = new Rent(0, this.startDate, this.endDate, this.selectedVehicle, this.selectedUser);
    this.rentService.addRent(newRent).subscribe((rent: Rent) => {
      console.log(rent);
    });
  }


}
