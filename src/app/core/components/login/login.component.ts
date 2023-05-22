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
  userLogged!: User;
  email!: string;
  password!: string;
  
  login() {
    this.authService.login(this.email, this.password).subscribe((result: boolean) => {
      if (result) {
        console.log("Login effettuato");
        this.authService.getUserLogged().subscribe((user: User | null) => {
          if (user) {
            this.userLogged = user;
            console.log(this.userLogged);
          }
        });
      } else {
        console.log("Login fallito");
      }
    });
  }
}
