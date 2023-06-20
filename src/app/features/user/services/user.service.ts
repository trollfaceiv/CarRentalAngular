import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UrlService } from "src/app/core/services/url.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = this.url.getBaseUrl()+'api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
    private router: Router,
    private url: UrlService) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, this.httpOptions)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])))
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>('addUser')))
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`
    return this.http.get<User>(url, this.httpOptions).pipe
      (catchError(this.handleError<User>('getUserById')))
  }

  getUserByEmail(email: string): Observable<User> {
    const url = `${this.usersUrl}/email/${email}`
    return this.http.get<User>(url, this.httpOptions).pipe
      (catchError(this.handleError<User>('getUserByEmail')))
  }

  deleteUser(id:number): Observable<User>{
    const url = `${this.usersUrl}/${id}`
    return this.http.delete<User>(url, this.httpOptions)
    .pipe(catchError(this.handleError<User>('deleteUser')))
  }

  updateUser(user: User): Observable<User>{
    const id = user.id;
    const url = `${this.usersUrl}/${id}`
    return this.http.put<User>(url, user, this.httpOptions)
    .pipe(catchError(this.handleError<User>('updateUser')))
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
