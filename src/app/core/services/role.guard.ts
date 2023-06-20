import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {


    return this.authService.isAdmin().pipe(
      map((res) => {
        if (res) {
          return true;
        } else {
          window.alert('Devi essere admin per accedere a questa pagina!');
          return false;
        }
      })
    );

  }
}