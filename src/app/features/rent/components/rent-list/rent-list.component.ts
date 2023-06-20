import { Component, OnInit } from '@angular/core';
import { Rent } from '../../models/rent';
import { RentService } from '../../services/rent.service';
import { MyTableConfig } from 'src/app/shared/components/my-table/my-table.config';
import { MyTableActionEnum } from 'src/app/shared/components/my-table/my-table.actionenum';
import { Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css']
})
export class RentListComponent implements OnInit {
  constructor(
    private rentService: RentService,
    private router: Router
  ) { }

  rentArray!: Rent[];
  editedRent!: Rent;
  rentFilteredArray!:any;
  showFilteredTable: boolean = false;
  renderedArray!: any;

  rentTabHeaders: MyTableConfig<Rent> = new MyTableConfig(
    ['Id', "Data di inizio noleggio", 'Data di fine noleggio', 'Id veicolo', 'Id utente', 'Stato: '],
    Rent,
    { defaultColumn: 'id', orderType: 'asc' },
    { columns: ['Id veicolo', 'Id utente'] },
    { itemPerPage: 5, itemPerPageOptions: [5, 10, 20, 50] },
    [{ type: MyTableActionEnum.DELETE, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Elimina', image: '' } },
    { type: MyTableActionEnum.APPROVE, buttonConfig: { customCssClass: 'btn btn-success mr-2', text: 'Approva', image: '' } },
    { type: MyTableActionEnum.REJECT, buttonConfig: { customCssClass: 'btn btn-danger mr-2', text: 'Rifiuta', image: '' } },
    ]);

  rentFilteredTable: MyTableConfig<Rent> = new MyTableConfig(
    ['Id', "Data di inizio noleggio", 'Data di fine noleggio', 'Targa veicolo', 'Email utente', 'Stato: '],
    Rent,
    { defaultColumn: 'id', orderType: 'asc' },
    { columns: ['Targa veicolo', 'Email utente'] },
    { itemPerPage: 5, itemPerPageOptions: [5, 10, 20, 50] },
    [{ type: MyTableActionEnum.DELETE, buttonConfig: { customCssClass: 'btn btn-primary mr-2', text: 'Elimina', image: '' } }
    ]);


  ngOnInit(): void {
    this.getRents();
  }

  toggleTable() {
    this.showFilteredTable = !this.showFilteredTable;
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

  getRents() {
    this.rentService.getRents().subscribe((rents: Rent[]) => {
      this.renderedArray = this.mapFunction(rents);
      let arrayToFilter = this.mapFunction(rents);
      this.renderedArray = _.filter(arrayToFilter, (rent: Rent) => rent.approved === 'In attesa');
      this.rentFilteredArray = _.filter(arrayToFilter, (rent: Rent) => rent.approved !== 'In attesa');
    });
  }


  /* transformArray(rents: Rent[]) {
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




  approveRent(rentId: number) {
    this.rentService.getRentById(rentId).subscribe((rent: Rent) => {
      this.editedRent = rent;
      this.editedRent.approved = 'Approvato';
      this.rentService.updateRent(this.editedRent).subscribe(() => {
        this.rentFilteredArray.push(this.editedRent);
        this.renderedArray = _.remove(this.renderedArray, (rent:any) => rent.id !== rentId);
        this.getRents();

      });
    });
  }

  rejectRent(rentId: number) {
    this.rentService.getRentById(rentId).subscribe((rent: Rent) => {
      this.editedRent = rent;
      this.editedRent.approved = 'Rifiutato';
      this.rentService.updateRent(this.editedRent).subscribe(() => {
        this.rentFilteredArray.push(this.editedRent);
        this.renderedArray = _.remove(this.renderedArray, (rent:any) => rent.id !== rentId);
        this.getRents();
      });
    });
  }


  handlePerformedAction(action: { action: MyTableActionEnum; rowData: any }) {
    if (action.action === MyTableActionEnum.APPROVE) {
      const rentId = action.rowData.id;
      this.approveRent(rentId);
    } else if (action.action === MyTableActionEnum.DELETE) {
      this.rentService.deleteRent(action.rowData.id).subscribe(() => {
        this.getRents();
      });
    }
    else if (action.action === MyTableActionEnum.REJECT) {
      const rentId = action.rowData.id;
      this.rejectRent(rentId)
    }
  }
}
