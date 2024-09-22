import { Component, Input } from '@angular/core';
import { DonationRequest, State } from '../../../models/donationRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationsService } from '../../../services/donations.service';

@Component({
  selector: 'app-donation-requests-detail',
  templateUrl: './donation-requests-detail.component.html',
  styleUrl: './donation-requests-detail.component.css',
})
export class DonationRequestsDetailComponent {
  @Input()
  donation!: DonationRequest;

  public State = State;
  errorMessage!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: DonationsService
  ) {}

  ngOnInit(): void {
    const tempId = this.route.snapshot.params['id'];
    this.rest.getDonationRequestById(tempId).subscribe({
      next: (data: DonationRequest) => {
        this.donation = data;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
