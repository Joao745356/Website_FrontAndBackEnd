import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Donor } from '../../../models/donorModel';
import { UsersServiceService } from '../../../services/users-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Partner } from '../../../models/partnerModel';

@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html',
  styleUrl: './donor-dashboard.component.css',
})
export class DonorDashboardComponent implements OnInit {
  currentUser: any = localStorage.getItem('currentUser');
  currentUserDecoded: any = jwtDecode(this.currentUser);
  userId = this.currentUserDecoded.id;
  donor!: Donor;
  numberOfPartners!: number;
  partners!: Partner[];
  errorMessage!: string;

  constructor(
    private rest: UsersServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    rest.getDonor(this.userId).subscribe({
      next: (data) => {
        this.donor = data;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
  ngOnInit(): void {
    window.paypal.Buttons().render(this.paymentRef.nativeElement);
    this.rest.getPartners().subscribe(
      (data) => {
        this.partners = data;
        this.numberOfPartners = this.partners.length;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  @ViewChild('PaymentRef',{static:true}) paymentRef!: ElementRef;
}
