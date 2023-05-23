import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  providers: [AuthService],
  styleUrls: ['./app-header.component.css']
})


export class AppHeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  isAdmin = false;
  loggedUser? = this.authService.getUserLogged();

  logout(){
    this.authService.logout();
    this.route.navigate(['']).then(() => {
      location.reload();
    });
  }

  
}
