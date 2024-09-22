import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  
  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const currentUser:any = localStorage.getItem('currentUser');
      
      if (currentUser) {
        // Decode the token to extract user role
        const decodedToken:any = jwtDecode(currentUser);
        const userRole = decodedToken.role;

        // Check if the user role allows access to the route
        if (userRole === 'donor' && route.data.role === 'donor') {
          return true;
        } else if (userRole === 'partner' && route.data.role === 'partner') {
          return true;
        } else {
          // Redirect to login page if role does not match
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      }

      // Redirect to login page if no user is logged in
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}