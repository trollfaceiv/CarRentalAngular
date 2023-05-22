import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  providers: [AuthService],
  styleUrls: ['./app-header.component.css']
})


export class AppHeaderComponent {

  constructor(private authService: AuthService) { }


  loggedUser? = this.authService.getUserLogged();

  logout(){
    this.authService.logout();
  }
}
