import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortAndPaginatePipe implements PipeTransform {
  counter = 0;
  transform(value: any[], column: string, currentSortStatus: any[], pageSize: number, currentPage: number, filterValue: string, selectedOption:string): any[] {
    let sortedData = _.cloneDeep(value);
    // Applica l'ordinamento
    currentSortStatus.forEach(element => {
      if (element.defaultColumn === column) {
        if (element.orderType === '' || element.orderType === 'asc') {
          sortedData = _.sortBy(sortedData, column);
          element.orderType = 'desc';
        } else if (element.orderType === 'desc') {
          sortedData = _.sortBy(sortedData, column).reverse();
          element.orderType = 'asc';
        }
      }
    });
    // Applica la paginazione
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Applica il filtro
    if(filterValue){
    filterValue = filterValue.trim().toLowerCase();
    sortedData = value.filter(entity =>
      entity[selectedOption].toString().toLowerCase().includes(filterValue));
    }
    return sortedData.slice(startIndex, endIndex);
  }



  
}
