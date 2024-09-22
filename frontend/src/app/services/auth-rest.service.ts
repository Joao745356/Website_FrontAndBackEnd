import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Donor } from '../models/donorModel';
import { Partner } from '../models/partnerModel';

const endpoint = 'http://localhost:3000/api/auth/'
const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthRestService {

  constructor(private http:HttpClient) {}

  login(email: string, password:string): Observable<AuthRestModelResponse>{
    return this.http.post<AuthRestModelResponse>(endpoint+"login", new LoginModel( email, password)).pipe(
      catchError(this.handleError)
    );;
  }
  
  logout() {
    localStorage.removeItem('currentUser');
  }

  registerDonor(email: string, password: string, name: string) :  Observable<AuthRestModelResponse>{
      return this.http.post<any>('http://localhost:3000/api/auth/registerDonor', new Donor( email, password, name)).pipe(
        catchError(this.handleError)
      );
  }

  registerPartner(file: File, name: string, password: string, email: string, description: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('description', description);

    return this.http.post<any>('http://localhost:3000/api/auth/registerPartner', formData).pipe(
      catchError(this.handleError)
    );
}

recoveryPasswordEmail(email: { email: string }): Observable<any> {
  return this.http.post<any>(`${endpoint}send-email`, email).pipe(
    catchError(this.handleError)
  );
}

resetPasswordService(resetObj: any):Observable<any>{
  return this.http.post<any>(`${endpoint}reset-password`, resetObj).pipe()
}


private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = error.error.errorMessage || error.error.error || 'Server error';
  }
  return throwError(errorMessage);
}
}



export interface AuthRestModelResponse{

}

export class LoginModel{

  constructor(public email:string, public password:string){}

}

