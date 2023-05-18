import { MyHeaders } from "./my-table.headers";
import * as _ from "lodash";
import { MyOrder } from "./my-table.order";
import { MySearch } from "./my-table.searchvalues";
import { MyPagination } from "./my-table.pagination";
import { MyAction } from "./my-table.action";

export class MyTableConfig<T>{

    headers!: MyHeaders[]
    order!: MyOrder;
    search!: MySearch;
    pagination!: MyPagination;
    actions!: MyAction[];

    public getHeaders(){
      return this.headers;
    }

    constructor(labels: string[],className: new(...args: any[]) => T, order:MyOrder, searchFields:MySearch, pagination:MyPagination, actions: MyAction[]){
        this.headers = this.labelToMap(this.getClassAttributes(className),labels);
        this.order = order;
        this.search = searchFields;
        this.pagination = pagination;
        this.actions = actions;
    }

    public getKeys(){
      return _.map(this.headers,'key');
    }

 
    labelToMap(keys: string[], labels: string[]){
      console.log(Object.entries(_.zipObject(keys,labels)).map(([key,label]) => ({key,label})));
      return Object.entries(_.zipObject(keys,labels)).map(([key,label]) => ({key,label}));    
    }

    getClassAttributes<T>(className: new(...args: any[]) => T){
        const attributes = new Set<string>();
        const instance = new className();
        Object.getOwnPropertyNames(instance).forEach(key => {
            if (key !== 'constructor') {
              attributes.add(key);
            }
          });
          return Array.from(attributes);
    }
    }
