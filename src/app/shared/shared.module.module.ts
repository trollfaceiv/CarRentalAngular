import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { RouterModule } from '@angular/router';
import { MyTableComponent } from './components/my-table/my-table.component';
import { MyButtonComponent } from './components/my-button/my-button.component';
import { PaginationPipePipe } from './pipes/pagination/pagination-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { SortAndPaginatePipe } from './pipes/sorting/sort.pipe';

@NgModule({
  declarations: [
    AppHeaderComponent,
    MyTableComponent,
    MyButtonComponent,
    PaginationPipePipe,
    SortAndPaginatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AppHeaderComponent,
    MyTableComponent,
  ]
})
export class SharedModuleModule { }
