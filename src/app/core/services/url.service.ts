import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  url = 'http://localhost:8080/'
  constructor() { }
  
  getBaseUrl(){
    return this.url;
  }
}
