import { Component, OnInit } from '@angular/core';
import { AuthRestService } from '../../../services/auth-rest.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';  // Use a named import


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string;
  password: string;
  errorMessage!: string;
  

  constructor(
    private router: Router,
    private authService: AuthRestService,
  ) {
    this.password = '';
    this.email = '';
  }

  login(): void {
    this.authService
      .login(this.email, this.password)
      .subscribe({
        next: (response: any) => {
          if (response && response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            const decodedToken: any = jwtDecode(response.token);
            const userRole = decodedToken.role;

            if (userRole === 'donor') {
              this.router.navigate(['/donor-dashboard']);
            } else if (userRole === 'partner') {
              this.router.navigate(['/partner-dashboard']);
            } else {
              this.router.navigate(['/login']);
            }
          } else {
            this.errorMessage = 'Login error!';
          }
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    }
  }