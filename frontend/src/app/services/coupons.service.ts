import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Coupon } from '../models/coupon';

const endpoint = 'http://localhost:3000/api/rewards/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  constructor(private http: HttpClient) {}

  getCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(endpoint + 'coupons').pipe(
      catchError(this.handleError)
    );
  }

  acquireCoupon(donor: string, coupon: string): Observable<any> {
    return this.http.post(
      endpoint + 'coupons/' + donor + '/' + coupon,
      {},
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  getDonorCoupons(donorId:string):Observable<Coupon[]>{
    return this.http.get<Coupon[]>(endpoint + '/coupons/' + donorId)
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
