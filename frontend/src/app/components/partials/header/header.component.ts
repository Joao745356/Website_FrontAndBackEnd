import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthRestService } from '../../../services/auth-rest.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService:AuthRestService) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.isLoggedIn = currentUser !== null;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkLoginStatus();
    });
  }

  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

}
