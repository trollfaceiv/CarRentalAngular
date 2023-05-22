import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTableConfig } from 'src/app/shared/components/my-table/my-table.config';
import { MyHeaders } from 'src/app/shared/components/my-table/my-table.headers';
import { HeaderExtractorService } from 'src/app/shared/services/header-extractor.service';
import { MyButtonConfig } from 'src/app/shared/components/my-button/my-button.config';

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

  selectedVehicle!: Vehicle;
  attributes!: MyHeaders[];
  mockVehicle: Vehicle = new Vehicle(1, 'Fiat', 'Panda', '2010-10-10', 'AB123CD');
  sendButton: MyButtonConfig =  { customCssClass: 'btn btn-primary mr-2', text: 'Invia', image: '' };
  saveButton: MyButtonConfig =  { customCssClass: 'btn btn-primary mr-2', text: 'Salva', image: '' };

  ngOnInit(): void {
    if(!this.exist()){
      this.selectedVehicle = new Vehicle(0, '', '', '', '');
    }
    else{this.getSelectedVehicle();
    }
    this.getAttributes();
    console.log(this.attributes);
  }

  exist(){
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

  updateVehicle(){
    this.vehicleService.updateVehicle(this.selectedVehicle).subscribe();
    this.router.navigate(['/vehicle-info']);
  }

  saveVehicle(){
    this.vehicleService.addVehicle(this.selectedVehicle).subscribe();
    this.router.navigate(['/vehicle-info']);
  }
}

