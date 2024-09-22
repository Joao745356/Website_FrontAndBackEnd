import { Component, OnInit } from '@angular/core';
import { DonationsService } from '../../../services/donations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DonationRequest } from '../../../models/donationRequest';

@Component({
  selector: 'app-donation-requests-view',
  templateUrl: './donation-requests-view.component.html',
  styleUrl: './donation-requests-view.component.css',
})
export class DonationRequestsViewComponent {
  currentUser: any = localStorage.getItem('currentUser');
  currentUserDecoded: any = jwtDecode(this.currentUser);
  userId = this.currentUserDecoded.id;

  donationRequests: DonationRequest[];

  errorMessage!: string;

  constructor(
    private rest: DonationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.donationRequests = [];
  }

  ngOnInit(): void {
    this.getDonationRequests();
  }

  getDonationRequests() {
    this.rest.getDonationRequestsByDonor(this.userId).subscribe({
      next: (data: DonationRequest[]) => {
        console.log(data);
        this.donationRequests = data;
      },

      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  viewDetails(id: string) {
    this.router.navigate(['donor/donation-requests/' + id]);
  }

  makeRequest() {
    this.router.navigate(['makeDonationRequest']);
  }
}
