import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError,  map  } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle.model';
import { Router } from '@angular/router';
import { UrlService } from "src/app/core/services/url.service";

@Injectable({
  providedIn: 'root'
})


export class VehicleService {
  vehicleUrl =  this.url.getBaseUrl() + 'api/vehicles';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
    private router: Router,
    private url: UrlService ) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehicleUrl, this.httpOptions).pipe(
      catchError(this.handleError<Vehicle[]>('getVehicles', []))
    );
  }
  
  

  addVehicle(vehicle: Vehicle): Observable<Vehicle>{
    return this.http.post<Vehicle>(this.vehicleUrl, vehicle, this.httpOptions)
    .pipe(catchError(this.handleError<Vehicle>('addVehicle')))
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle>{
    const id = vehicle.id;
    const url = `${this.vehicleUrl}/${id}`
    return this.http.put<Vehicle>(url, vehicle, this.httpOptions)
    .pipe(catchError(this.handleError<Vehicle>('updateVehicle')))
  }

  deleteVehicle(id:number): Observable<Vehicle>{
    const url = `${this.vehicleUrl}/${id}`
    return this.http.delete<Vehicle>(url, this.httpOptions)
    .pipe(catchError(this.handleError<Vehicle>('deleteVehicle')))
  }

  getVehicleById(id: number): Observable<Vehicle>{ 
    const url = `${this.vehicleUrl}/${id}`
    return this.http.get<Vehicle>(url, this.httpOptions).pipe
    (catchError(this.handleError<Vehicle>('getVehicleById')))
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error.status == 403)
        this.router.navigateByUrl('/access-denied');
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

interface GetResponse {
  _embedded: {
    vehicle: Vehicle[];
  }
}
