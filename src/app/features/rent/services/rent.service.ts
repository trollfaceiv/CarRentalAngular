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

  deleteRent(id:number): Observable<Rent>{
    const url = `${this.rentUrl}/${id}`
    return this.http.delete<Rent>(url, this.httpOptions)
    .pipe(catchError(this.handleError<Rent>('deleteRent')))
  }

  getRentById(id: number): Observable<Rent> {
    const url = `${this.rentUrl}/${id}`
    return this.http.get<Rent>(url).pipe
      (catchError(this.handleError<Rent>('getRentById')))
  }
  
  getRentByEmail(email: string): Observable<Rent[]> {
    const url = `${this.rentUrl}?user=${email}`
    return this.http.get<Rent[]>(url).pipe
      (catchError(this.handleError<Rent[]>('getRentByEmail', [])))
  }
  updateRent(rent: Rent): Observable<Rent>{
    const id = rent.id;
    const url = `${this.rentUrl}/${id}`
    return this.http.put<Rent>(url, rent, this.httpOptions)
    .pipe(catchError(this.handleError<Rent>('updateRent')))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}