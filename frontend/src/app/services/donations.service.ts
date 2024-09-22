import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation, State} from '../models/donation';
import { Observable, catchError, throwError } from 'rxjs';
import { DonationRequest, Institution, Location,  DonorEmail, Quality  } from '../models/donationRequest';
import { CollectionPoint } from '../models/collectionPoint';

const endpoint = 'http://localhost:3000/api/donations/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}; 


@Injectable({
  providedIn: 'root'
})

export class DonationsService {

  constructor(private http: HttpClient) { }

  getDonationById(id:string): Observable<Donation>{
    return this.http.get<Donation>(endpoint + id).pipe(
      catchError(this.handleError)
    );
  }

  getDonationRequestById(id:string): Observable<DonationRequest>{
    return this.http.get<DonationRequest>(endpoint + 'requests/' + id).pipe(
      catchError(this.handleError)
    );
  }

  getDonationRequestsByDonor(id:string):Observable<DonationRequest[]>{
    return this.http.get<DonationRequest[]>(endpoint + 'requests/donor/' + id).pipe(
      catchError(this.handleError)
    );
  }

  makeDonationRequest(donationRequest:DonationRequest):Observable<DonationRequest>{
    return this.http.post<DonationRequest>(endpoint, donationRequest).pipe(
      catchError(this.handleError)
    );
  }

  getDonationsByDonor(id:string):Observable<Donation[]>{
    return this.http.get<Donation[]>(endpoint + 'donor/' + id).pipe(
      catchError(this.handleError)
    );
  }

  getDonationsByPartner(id:string):Observable<Donation[]>{
    return this.http.get<Donation[]>(endpoint + 'partner/' + id).pipe(
      catchError(this.handleError)
    );
  }

  updateDonationState(id:string, state:State):Observable<Donation>{
    return this.http.put<Donation>(endpoint + 'update-donation-state/' + id, {state: state} ).pipe(
      catchError(this.handleError)
    );
  }

  getCollectionPoints():Observable<CollectionPoint[]>{
    return this.http.get<CollectionPoint[]>(endpoint + 'collectionPoints').pipe(
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
    errorMessage = error.error.errorMessage || error.error.error || 'Server error';
  }
  return throwError(errorMessage);
}
}


