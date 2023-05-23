import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from 'src/app/features/user/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private route: Router) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>('http://localhost:3000/users', { params: { email, password } })
      .pipe(
        tap((users: User[]) => {
          if (users.length === 1) {
            localStorage.setItem('loggedInUser', JSON.stringify(users[0]));
            this.route.navigate(['']).then(() => {
              location.reload();
            });
          }
        }),
        map((users: User[]) => users.length === 1)
        
      );
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    if(this.getUserLogged() === null){
      console.log("Logout effettuato");
    }
    else{
      console.log("Logout fallito");
    }
  }

  
  getUserLogged(): User | null {
    const savedUser = localStorage.getItem('loggedInUser');
    return savedUser ? JSON.parse(savedUser) : null;
  }

  isLogged(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }

  isAdmin(): boolean {
    const user = this.getUserLogged();
    return user?.role === 'admin';
  }
}
