import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/features/user/models/user';
import { Vehicle } from 'src/app/features/vehicle/models/vehicle.model';
import { VehicleService } from 'src/app/features/vehicle/services/vehicle.service';
import { MyButtonConfig } from 'src/app/shared/components/my-button/my-button.config';
import { Rent } from '../../models/rent';
import { RentService } from '../../services/rent.service';
import { AuthService } from 'src/app/core/services/auth.service';

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
    private rentService: RentService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getSelectedVehicle();
    this.getUserLogged();
  }


  selectedVehicle!: Vehicle
  selectedUser!: User | null
  rentButton: MyButtonConfig = { customCssClass: 'btn btn-primary mr-2', text: 'Noleggia', image: '' };
  invalidTime!: boolean;
  startDate!: Date;
  endDate!: Date;
  errorMessage!: string;

  getErrorMessage() {
    this.errorMessage = this.rentService.exceptionMessage;
    console.log(this.errorMessage);
  }
  getSelectedVehicle() {
    const vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicleService.getVehicleById(vehicleId)
      .subscribe((vehicle: Vehicle) => { this.selectedVehicle = vehicle });
  }

  getUserLogged() {
    const savedUser = localStorage.getItem('loggedInUser');
    this.authService.getUserLogged().subscribe((user: User | null) => {
      this.selectedUser = user;
    });
  }

  createRent() {
    const vehiclId = this.selectedVehicle.id;
    const useId = this.selectedUser?.id;
    if (this.selectedUser != null) {
      let newRent = new Rent(0, this.startDate, this.endDate, this.selectedVehicle, this.selectedUser);
      const today = new Date();
      const formattedStartDate = new Date(this.startDate);
      const formattedEndDate = new Date(this.endDate)
      console.log(newRent)
      if (formattedEndDate >= formattedStartDate && formattedStartDate >= today) {
        this.rentService.addRent(newRent).subscribe({
          next: () => {
            this.invalidTime = true;
            console.log("ciao");
          },
          error: () => {
            this.invalidTime = false;
            this.getErrorMessage(); // Passa l'errore a this.getErrorMessage()
          }
        });
      }
      else {
        this.invalidTime = false;
        console.log("ci sono")
      }
    }
  }
}



