import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
        this.authService.getUserLogged().subscribe((user: User | null) => {
          this.userLogged = user;
          this.loginFailed = false;
          console.log(this.userLogged);
        });
      } else {
        this.loginFailed = true;
        console.log("Login fallito");
      }
    });
  }
  
}
