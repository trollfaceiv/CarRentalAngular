import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])))
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user)
      .pipe(catchError(this.handleError<User>('addUser')))
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`
    return this.http.get<User>(url).pipe
      (catchError(this.handleError<User>('getUserById')))
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
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
