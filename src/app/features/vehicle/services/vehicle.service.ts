import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})



export class VehicleService {
  vehicleUrl = 'assets/vehicles.json';

  constructor(private http: HttpClient) { }


  getVehicles(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.vehicleUrl)
    .pipe(catchError(this.handleError<Vehicle[]>('getVehicles', [])))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
