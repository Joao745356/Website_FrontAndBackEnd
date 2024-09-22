import { Component, Input, OnInit } from '@angular/core';
import { Coupon } from '../../../models/coupon';
import { Donor } from '../../../models/donorModel';
import { jwtDecode } from 'jwt-decode';
import { CouponsService } from '../../../services/coupons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersServiceService } from '../../../services/users-service.service';

@Component({
  selector: 'app-donor-coupons',
  templateUrl: './donor-coupons.component.html',
  styleUrl: './donor-coupons.component.css',
})
export class DonorCouponsComponent implements OnInit {
  currentUser: any = localStorage.getItem('currentUser');
  currentUserDecoded: any = jwtDecode(this.currentUser);
  donorId = this.currentUserDecoded.id;

  user!: Donor;
  coupons!: Coupon[];
  donorCoupons!: Coupon[];
  errorMessage!: string;

  ngOnInit(): void {
    this.getDonor();
    this.getCoupons();
    this.getDonorCoupons();
  }

  constructor(
    private rest: CouponsService,
    private userRest: UsersServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getDonor() {
    this.userRest.getDonor(this.donorId).subscribe({
      next: (data: Donor) => {
        this.user = data;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  getCoupons() {
    this.rest.getCoupons().subscribe({
      next: (data: Coupon[]) => {
        this.coupons = data;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  getDonorCoupons(){
    this.rest.getDonorCoupons(this.donorId).subscribe({
      next:(data:any) =>{ // Change type to any or to the type of data being received
        this.donorCoupons = data.couponObjects; // Access the correct property
        console.log(this.donorCoupons);
    },
    
      error: (error) => {
        this.errorMessage = error;
      },
    })
  }

  acquireCoupon(couponId: string) {
    this.rest.acquireCoupon(this.donorId, couponId).subscribe(
      () => {
        // Handle success
        console.log('Coupon acquired successfully');
        this.getDonor(); // Reload donor's information
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
