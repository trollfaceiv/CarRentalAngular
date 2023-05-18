import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginationPipe'
})
export class PaginationPipePipe implements PipeTransform {

    transform(items: any[], pageSize: number, currentPage: number): any[] {
      console.log("vengo chiamata");
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      items.slice(startIndex,endIndex)
      return items.slice(startIndex, endIndex);
    }
  }

