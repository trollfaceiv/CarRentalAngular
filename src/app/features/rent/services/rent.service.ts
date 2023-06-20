import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, throwError } from "rxjs";
import { User } from "../../user/models/user";
import { Rent } from "../models/rent";
import { Router } from "@angular/router";
import { UrlService } from "src/app/core/services/url.service";

@Injectable({
  providedIn: 'root'
})
export class RentService {
  rentUrl = this.url.getBaseUrl() + 'api/rents';
  exceptionMessage!:string;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private url: UrlService) { }


  getRents(): Observable<Rent[]> {
    return this.http.get<Rent[]>(this.rentUrl, this.httpOptions)
      .pipe(catchError(this.handleError<Rent[]>('getRents', [])))
  }

  addRent(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(this.rentUrl, rent, this.httpOptions).pipe(
      catchError((error: any) => {
          this.exceptionMessage = error.error;
          const errorMessage = error.error;
          throw new Error(errorMessage);
      })
    );
  }

  deleteRent(id:number): Observable<Rent>{
    const url = `${this.rentUrl}/${id}`
    return this.http.delete<Rent>(url, this.httpOptions)
    .pipe(catchError(this.handleError<Rent>('deleteRent')))
  }

  getRentById(id: number): Observable<Rent> {
    const url = `${this.rentUrl}/${id}`
    return this.http.get<Rent>(url, this.httpOptions).pipe
      (catchError(this.handleError<Rent>('getRentById')))
  }
  
  getRentByID(id: number): Observable<Rent[]> {
    const url = `${this.rentUrl}/userId/${id}`
    return this.http.get<Rent[]>(url, this.httpOptions).pipe
      (catchError(this.handleError<Rent[]>('getRentByID', [])))
  }

  
  updateRent(rent: Rent): Observable<Rent>{
    const id = rent.id;
    const url = `${this.rentUrl}/${id}`
    return this.http.put<Rent>(url, rent, this.httpOptions)
    .pipe(catchError(this.handleError<Rent>('updateRent')))
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