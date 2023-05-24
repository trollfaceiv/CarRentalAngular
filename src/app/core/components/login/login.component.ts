import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/features/user/models/user';

@Component({
  selector: 'app-login',
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _http: HttpClient, private _route: Router, private authService: AuthService) { }
  userLogged: User | null = null;
  email!: string;
  password!: string;
  loginFailed = false;
  login() {
    this.authService.login(this.email, this.password).subscribe((result: boolean) => {
      if (result) {
        console.log("Login effettuato");
        this.userLogged = this.authService.getUserLogged();
        this.loginFailed = false;
      } else {
        this.loginFailed = true;
        console.log("Login fallito");
      }
    });
  }
}
