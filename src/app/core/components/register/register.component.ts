import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    constructor(private _http: HttpClient, private _route: Router, private authService: AuthService) { }



    email!: string;
    firstName!: string;
    lastName!: string;
    birthDate!: Date;
    password!: string;

    register() {
      this.authService.register(this.firstName, this.lastName, this.email, this.password, this.birthDate).subscribe();
    }

}
