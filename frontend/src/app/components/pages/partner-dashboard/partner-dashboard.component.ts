import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Donor } from '../../../models/donorModel';
import { Partner } from '../../../models/partnerModel';
import { UsersServiceService } from '../../../services/users-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationsService } from '../../../services/donations.service';
import { Donation } from '../../../models/donation';

@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrl: './partner-dashboard.component.css'
})
export class PartnerDashboardComponent implements OnInit {

  currentUser:any = localStorage.getItem('currentUser')
  currentUserDecoded:any = jwtDecode(this.currentUser)
  userId = this.currentUserDecoded.id
  partner!: Partner;
  numberOfDonations!: number;
  numberOfDonators!: number;
  partners!:Partner[];

  errorMessage!:String
  constructor(private rest:UsersServiceService, private route: ActivatedRoute, private router:Router, private donationService:DonationsService){
    rest.getPartner(this.userId).subscribe({next: (data)=>{
      this.partner = data},
      error: (err)=> this.errorMessage = err
    });

  }
  ngOnInit(): void {
    this.donationService.getDonationsByPartner(this.userId).subscribe((data) => {
      const uniqueDonorIds = new Set(data.map(donation => donation.donor.email));
      this.numberOfDonators = uniqueDonorIds.size;
    }, error => {
      this.errorMessage = error;
    });
}

}
