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
  vehicleUrl = 'http://localhost:3000/vehicles';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  
  getVehicles(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.vehicleUrl)
    .pipe(catchError(this.handleError<Vehicle[]>('getVehicles', [])))
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle>{
    return this.http.post<Vehicle>(this.vehicleUrl, vehicle)
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
    return this.http.get<Vehicle>(url).pipe
    (catchError(this.handleError<Vehicle>('getVehicleById')))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
