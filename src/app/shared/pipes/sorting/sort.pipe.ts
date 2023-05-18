 import { Pipe, PipeTransform } from '@angular/core';
 import * as _ from 'lodash';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(value: any[], column: string, currentSortStatus: any[]): any[] {
    let sortedData = _.cloneDeep(value);
      currentSortStatus.forEach(element => {
        if(element.defaultColumn === column){
          if(element.orderType === '' || element.orderType ==='asc'){
            sortedData = _.sortBy(sortedData,column);
            console.log(sortedData);
             element.orderType = 'desc';
          }
          else if(element.orderType === 'desc'){
            sortedData = _.sortBy(sortedData,column).reverse();
             element.orderType = 'asc';
          }
        }
      });
      return sortedData;
    }
  }


 