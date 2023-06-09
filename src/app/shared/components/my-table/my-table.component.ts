import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MyTableConfig } from './my-table.config';
import * as _ from "lodash";

import { MyHeaders } from './my-table.headers';
import { MyOrder } from './my-table.order';
import { MySearch } from './my-table.searchvalues';
import { MyAction } from './my-table.action';
import { MyTableActionEnum } from './my-table.actionenum';


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
})
export class MyTableComponent<T> implements OnInit{


  @Input() tableConfig!: MyTableConfig<T>;
  @Input() data!: any[];

  fieldOptions!: MyHeaders[];
  selectedData:any;
  filterValue!: string;

  sortedData = this.data;
  currentSortStatus!: MyOrder[];
  column!: string;

  selectedOption!: string;
  searchResult! : any[];

  pageNumber!: number;
  itemPerPage!: number;
  pages:number[] = [];
  currentPage = 1;
  pageSize!: number;
  pagesOptions: number[] = [];


  firstClick!: boolean;

  @Output() performActionEmitter: EventEmitter<{ action: MyTableActionEnum; rowData: any }> = new EventEmitter<{ action: MyTableActionEnum; rowData: any }>();
  @Output() performNewActionEmitter: EventEmitter<MyTableActionEnum> = new EventEmitter<MyTableActionEnum>();
  constructor(private cdr: ChangeDetectorRef) { }
  

  
  ngOnInit(): void {
    this.sortedData = this.data;
    console.log(this.data);
    this.initializeSortStatus();
    this.applyFieldOptions(this.tableConfig.search);
    this.initializeOrUpdatePagination();
    console.log(this.data.length);

  }

  public performAction(action: MyTableActionEnum, rowData: any): void {
    console.log("È stato premuto il bottone " + action);
    console.log("è stato passato" + rowData);
    this.performActionEmitter.emit({ action, rowData });
  }
  
  public performNewAction(action: MyTableActionEnum): void {
    console.log("È stato premuto il bottone " + action);
    this.performNewActionEmitter.emit(action);
  }
  
  

  public changePage(page: number) {
    this.currentPage = page;
  }

  initializeOrUpdatePagination(){
    if(!this.itemPerPage)
      this.itemPerPage = this.tableConfig.pagination.itemPerPage;
    this.pageNumber = Math.ceil(this.data.length/this.itemPerPage);
    this.pages = Array.from({ length: this.pageNumber }, (_, i) => i + 1);
    this.currentPage = 1;
  }
  
  changePagination(pageConfig: number){
    this.itemPerPage = pageConfig;
    this.initializeOrUpdatePagination();
  }

  initializeSortStatus(){
    const headers = this.tableConfig.getKeys();
    this.currentSortStatus = headers.map(defaultColumn =>({defaultColumn, orderType:''}));
    if(this.tableConfig.order){
      const index =_.findIndex(this.currentSortStatus,{'defaultColumn':this.tableConfig.order.defaultColumn});
      _.set(this.currentSortStatus[index], 'orderType', this.tableConfig.order.orderType);
      this.sortTable(this.tableConfig.order.defaultColumn);
    }
  }

  sortTable(column: string) {
    if (this.column === column) {
      // Se l'header è già selezionato, inverte l'ordine di ordinamento
      const sortStatus = _.find(this.currentSortStatus, { defaultColumn: column });
      if (sortStatus) {
        sortStatus.orderType = sortStatus.orderType === 'asc' ? 'desc' : 'asc';
      }
    } else {
      // Se è selezionato un nuovo header, reimposta lo stato di ordinamento
      _.forEach(this.currentSortStatus, sortStatus => {
        if (sortStatus.defaultColumn === column) {
          sortStatus.orderType = 'asc';
        } else {
          sortStatus.orderType = '';
        }
      });
    }
  
    this.column = column;
  }
  
  
  


  applyFieldOptions(searchFields : MySearch){
    let keysOfLabels: MyHeaders[] = [];
    searchFields.columns.forEach(element => {
      let header = <MyHeaders> (_.find(this.tableConfig.getHeaders(),{'label':element}));
      keysOfLabels.push(header);
    });
    this.fieldOptions = keysOfLabels;
  }
  

  getSearchValue(column: string, filterValue: string){
    this.filterValue = filterValue;
    filterValue = filterValue.trim().toLowerCase();
    this.data = this.sortedData.filter(entity =>
      entity[column].toString().toLowerCase().includes(filterValue),
    );
    this.pageNumber = Math.ceil(this.data.length/this.itemPerPage)
    this.pages = Array.from({ length: this.pageNumber }, (_, i) => i + 1);
    console.log(this.pageNumber);
    }
  }
  












  
