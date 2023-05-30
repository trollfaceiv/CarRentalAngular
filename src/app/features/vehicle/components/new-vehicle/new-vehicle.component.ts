import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTableConfig } from 'src/app/shared/components/my-table/my-table.config';
import { MyHeaders } from 'src/app/shared/components/my-table/my-table.headers';
import { HeaderExtractorService } from 'src/app/shared/services/header-extractor.service';
import { MyButtonConfig } from 'src/app/shared/components/my-button/my-button.config';
import * as _ from 'lodash';

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  providers: [VehicleService, HeaderExtractorService],
  styleUrls: ['./new-vehicle.component.css']
})
export class NewVehicleComponent implements OnInit {

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private headerService: HeaderExtractorService,
    private router: Router) { }

  plateError = false;
  selectedVehicle!: Vehicle;
  attributes!: MyHeaders[];
  mockVehicle: Vehicle = new Vehicle(1, 'Fiat', 'Panda', new Date(), 'AB123CD');
  sendButton: MyButtonConfig = { customCssClass: 'btn btn-primary mr-2', text: 'Invia', image: '' };
  saveButton: MyButtonConfig = { customCssClass: 'btn btn-primary mr-2', text: 'Salva', image: '' };
  vehicleArray!: Vehicle[];
  regexError = false;
  ngOnInit(): void {
    this.getVehicles();

    if (!this.exist()) {
      this.selectedVehicle = new Vehicle(0, '', '', new Date(), '');
    }
    else {
      this.getSelectedVehicle();
    }
    this.getAttributes();
  }

  getVehicles() {
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicleArray = vehicles;
    });
  }
  exist() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  getAttributes() {
    this.attributes = this.headerService.extractHeadersFromClass(this.mockVehicle, ['Id', 'Casa madre', 'Modello', 'Data di Immatricolazione', 'Numero di targa']);
  }

  getSelectedVehicle() {
    const vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicleService.getVehicleById(vehicleId)
      .subscribe((vehicle: Vehicle) => { this.selectedVehicle = vehicle });
  }

  updateVehicle() {
    const vehicleFound = _.find(this.vehicleArray, { plateNumber: this.selectedVehicle.plateNumber });
    if (vehicleFound && vehicleFound.id !== this.selectedVehicle.id) {
      this.plateError = true;
      this.regexError = false;
    }
    else if(!this.regexTest()){
      this.regexError = true;
      this.plateError = false;
    }
    else {
      this.vehicleService.updateVehicle(this.selectedVehicle).subscribe();
      this.router.navigate(['/vehicle-info']);
    }
  }

  regexTest() {
    const regex = /^[A-Z]{2}\d{3}[A-Z]{2}$/;
    if (!regex.test(this.selectedVehicle.plateNumber)) {
      return false;
    }
    return true;
  }

  find(){
    const vehicleFound = _.find(this.vehicleArray, { plateNumber: this.selectedVehicle.plateNumber });
    if(vehicleFound){
      return true;
    }
    return false;
  }

  saveVehicle() {
    const regex = /^[A-Z]{2}\d{3}[A-Z]{2}$/;
    if (!this.regexTest()) {
      this.regexError = true;
    }
    else if (this.find()) {
      this.plateError = true;
      this.regexError = false;
    }
    if(!this.find() && this.regexTest()) {
      this.vehicleService.addVehicle(this.selectedVehicle).subscribe();
      this.router.navigate(['/vehicle-info']);
    }
  }
}

