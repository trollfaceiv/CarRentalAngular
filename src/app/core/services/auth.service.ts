import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from 'src/app/features/user/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    // Effettua una richiesta al JSON Server per verificare le credenziali dell'utente
    return this.http.get<User[]>('http://localhost:3000/users', { params: { email, password } })
      .pipe(
        tap((users: User[]) => {
          if (users.length === 1) {
            this.loggedInUser$.next(users[0]);
          }
        }),
        map((users: User[]) => users.length === 1) // Restituisce true se l'autenticazione è avvenuta con successo, altrimenti false
      );
  }

  getUserLogged(): Observable<User | null> {
    return this.loggedInUser$.asObservable();
  }

  isLogged(): boolean {
    return this.loggedInUser$.value !== null;
  }

  isAdmin(): boolean {
    const user = this.loggedInUser$.value;
    if (user && user.role === 'admin') {
      return true;
    }
    return false;
  }
}
