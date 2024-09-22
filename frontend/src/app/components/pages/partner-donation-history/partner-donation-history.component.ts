import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Donation } from '../../../models/donation';
import { DonationsService } from '../../../services/donations.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-partner-donation-history',
  templateUrl: './partner-donation-history.component.html',
  styleUrl: './partner-donation-history.component.css'
})
export class PartnerDonationHistoryComponent {

  currentUser:any = localStorage.getItem('currentUser')
  currentUserDecoded:any = jwtDecode(this.currentUser)
  userId = this.currentUserDecoded.id
  errorMessage!:String;

  donations: Donation[];
  
  constructor(private rest:DonationsService, private route: ActivatedRoute, private router:Router){
    this.donations = [];
  }

  ngOnInit(): void {
    this.getDonations()
  }

  getDonations(){
    this.rest.getDonationsByPartner(this.userId).subscribe({next: (data: Donation[]) => {
      console.log(data);
      this.donations = data;},
      error: (err) =>this.errorMessage = err
    })
  }

  viewDetails(id:string){
    this.router.navigate(['/partner/donation-details/' + id])
  }
}
