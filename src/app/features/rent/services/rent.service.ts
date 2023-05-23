import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { User } from "../../user/models/user";
import { Rent } from "../models/rent";

@Injectable({
  providedIn: 'root'
})
export class RentService {
  rentUrl = 'http://localhost:3000/rents';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  getRents(): Observable<Rent[]> {
    return this.http.get<Rent[]>(this.rentUrl)
      .pipe(catchError(this.handleError<Rent[]>('getRents', [])))
  }

  addRent(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(this.rentUrl, rent)
      .pipe(catchError(this.handleError<Rent>('addRent')))
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}