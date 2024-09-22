import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donor } from '../models/donorModel';
import { Observable, catchError, throwError } from 'rxjs';
import { Partner } from '../models/partnerModel';

const endpoint = 'http://localhost:3000/api/users/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  constructor(private http: HttpClient) {}

  getDonor(id: string): Observable<Donor> {
    return this.http.get<Donor>(endpoint + 'donors/' + id).pipe(
      catchError(this.handleError)
    )
  }

  getPartner(id: string): Observable<Partner> {
    return this.http.get<Partner>(endpoint + 'partners/' + id).pipe(
      catchError(this.handleError)
    );
  }

  getDonors(): Observable<Donor[]> {
    return this.http.get<Donor[]>(endpoint + 'donors/').pipe(
      catchError(this.handleError)
    );
  }

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(endpoint + 'partners/').pipe(
      catchError(this.handleError)
    );
  }

  /*tipo de ficheiro para imagens, etc - Blob*/
  getImage(imageName: String): Observable<Blob> {
    return this.http.get(endpoint + `partners/images/${imageName}`, {
      responseType: 'blob',
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage =
        error.error.errorMessage || error.error.error || 'Server error';
    }
    return throwError(errorMessage);
  }
}
