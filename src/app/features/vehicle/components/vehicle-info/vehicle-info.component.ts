import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { MyTableConfig } from 'src/app/shared/components/my-table/my-table.config';
import { MyTableActionEnum } from 'src/app/shared/components/my-table/my-table.actionenum';
import { VehicleService } from '../../services/vehicle.service';
import { MyHeaders } from 'src/app/shared/components/my-table/my-table.headers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vehicle-info',
  providers: [VehicleService],
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})

export class VehicleInfoComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private cdr: ChangeDetectorRef, private router: Router) { }

  vehicleArray!: Vehicle[];
  vehicleTabHeaders: MyTableConfig<Vehicle> = new MyTableConfig(
    ['Id', 'Casa madre', 'Modello', 'Data di Immatricolazione', 'Numero di targa'],
    Vehicle,
    { defaultColumn: 'id', orderType: 'asc' },
    { columns: ['Casa madre', 'Modello'] },
    { itemPerPage: 5, itemPerPageOptions: [5, 10, 20, 50] },
    [{ type: MyTableActionEnum.DELETE, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Elimina', image: '' } },
    { type: MyTableActionEnum.EDIT, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Modifica', image: '' } },
    { type: MyTableActionEnum.NEW_ROW, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Aggiungi riga', image: '' } }]);


  ngOnInit(): void {

    this.getVehicles();

  }


  handleNewPerformedAction(action: MyTableActionEnum) {
    if (action === MyTableActionEnum.NEW_ROW) {
      this.router.navigate(['/edit-vehicle']);
    }
  }

  handlePerformedAction(action: { action: MyTableActionEnum; rowData: any }) {
    if (action.action === MyTableActionEnum.EDIT) {
      const vehicleId = action.rowData.id;
      this.router.navigate(['/edit-vehicle/' + vehicleId]);
    } else if (action.action === MyTableActionEnum.DELETE) {
      this.deleteVehicles(action.rowData);
    }
  }




  getVehicles() {
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicleArray = vehicles;
    });
  }


  deleteVehicles(vehicle: Vehicle) {
    this.vehicleArray = this.vehicleArray.filter(v => v.id !== vehicle.id);
    this.vehicleService.deleteVehicle(vehicle.id).subscribe((response) => {
      console.log("get vehicles fatta");
    });
  }
}
