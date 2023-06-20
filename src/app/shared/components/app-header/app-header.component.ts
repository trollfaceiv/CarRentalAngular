import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/features/user/models/user';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  providers: [AuthService],
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  isAdmin!: boolean;
  loggedUser!: User | null;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe((result: boolean) => {
      this.isAdmin = result;
      console.log(this.isAdmin);
    });
    this.authService.getUserLogged().subscribe(
      (user: User | null) => {
        this.loggedUser = user;
        console.log(this.loggedUser);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['']).then(() => {
      location.reload();
    });
  }
}
