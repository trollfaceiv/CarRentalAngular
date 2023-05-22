import { Injectable } from '@angular/core';
import { MyHeaders } from '../components/my-table/my-table.headers';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class HeaderExtractorService {

  constructor() { }



  extractHeadersFromClass(obj: Object, labels: string[]): MyHeaders[]{
    const attributes = new Set<string>();
    Object.getOwnPropertyNames(obj).forEach(key => {
        if (key !== 'constructor') {
          attributes.add(key);
        }
      });
      return Array.from(attributes).map((key, index) => ({ key, label: labels[index]}));

  }

}
