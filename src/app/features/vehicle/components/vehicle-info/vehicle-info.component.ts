import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { MyTableConfig } from 'src/app/shared/components/my-table/my-table.config';
import { MyTableActionEnum } from 'src/app/shared/components/my-table/my-table.actionenum';
import { VehicleService } from '../../services/vehicle.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-info',
  providers: [VehicleService],
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})

export class VehicleInfoComponent implements OnInit {
  vehicleArray: Vehicle[] = []
  
  constructor(private vehicleService: VehicleService) { }

     ngOnInit() {     

    this.getVehicles();
  }

  vehicleTabHeaders = new MyTableConfig(
    ['Id', 'Casa madre', 'Modello', 'Data di Immatricolazione', 'Numero di targa'],
    Vehicle,
    { defaultColumn: 'id', orderType: 'desc' },
    { columns: ['Casa madre', 'Modello'] },
    { itemPerPage: 5, itemPerPageOptions: [5, 10, 20, 50] },
    [{ type: MyTableActionEnum.DELETE, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Elimina', image: '' } },
    { type: MyTableActionEnum.EDIT, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Modifica', image: '' } },
    { type: MyTableActionEnum.NEW_ROW, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Aggiungi riga', image: '' } }]);
      
  
    getVehicles(){
      this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
        this.vehicleArray = vehicles;
      });
    }
}
