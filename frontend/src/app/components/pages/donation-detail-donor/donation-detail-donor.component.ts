import { Component, Input, OnInit } from '@angular/core';
import { Donation, State } from '../../../models/donation';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationsService } from '../../../services/donations.service';

@Component({
  selector: 'app-donation-detail-donor',
  templateUrl: './donation-detail-donor.component.html',
  styleUrl: './donation-detail-donor.component.css'
})
export class DonationDetailDonorComponent implements OnInit {
  @Input()
  donation!: Donation;
  errorMessage!:String


  public State = State;
  constructor(private router: Router, private route: ActivatedRoute, private rest: DonationsService){
  
  }

  ngOnInit(): void {
    const tempId = this.route.snapshot.params['id'];
    this.rest.getDonationById(tempId).subscribe({
      next: (data: Donation) => {
        this.donation = data;
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
}