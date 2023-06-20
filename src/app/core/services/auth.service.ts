import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, concatMap } from 'rxjs/operators';
import { User } from 'src/app/features/user/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/features/user/services/user.service';
import { UrlService } from "src/app/core/services/url.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private route: Router, private userService: UserService, private url:UrlService) { }

  register(firstName: string, lastName: string, email: string, password: string, birthDate: Date): Observable<User> {
    return this.http.post<User>( this.url.getBaseUrl() + 'api/v1/auth/register', { firstName, lastName, email, password, birthDate }).pipe(
      concatMap(() => this.login(email, password))
    );
  }




  login(email: string, password: string) {
    return this.http.post<any>( this.url.getBaseUrl() + 'api/v1/auth/authenticate', { email, password }).pipe(
      map(
        userData => {
          sessionStorage.setItem('email', email);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          this.route.navigate(['']).then(() => {
            location.reload();
          });
          return userData;
        }
      )

    );
  }



  /* 
    login(email: string, password: string) {
      return this.http.post<any>('http://localhost:8080/api/v1/auth/authenticate', { email, password })
        .pipe(
          tap(() => {
            {
              localStorage.setItem('loggedEmail', JSON.stringify(email));
              localStorage.setItem('token', JSON.stringify(email)
              this.route.navigate(['']).then(() => {
                location.reload();
              });
            }
          }),
          map((users: User[]) => users.length === 1)
  
        );
    } */

  logout(): void {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');

    if (this.getUserLogged() === null) {
      console.log("Logout effettuato");
    }
    else {
      console.log("Logout fallito");
    }
  }



  getUserLogged(): Observable<User | null> {
    const email = sessionStorage.getItem('email') || '';
    return this.userService.getUserByEmail(email);
  }

  isLogged(): boolean {
    return sessionStorage.getItem('email') !== null;
  }

  isAdmin(): Observable<boolean> {
    return this.getUserLogged().pipe(
      map((user: User | null) => user?.role === 'ADMIN' || false)
    );
  }
}
