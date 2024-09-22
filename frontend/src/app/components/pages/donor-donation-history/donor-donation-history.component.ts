import { Component, OnInit } from '@angular/core';
import { DonationsService } from '../../../services/donations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Donation } from '../../../models/donation';

@Component({
  selector: 'app-donor-donation-history',
  templateUrl: './donor-donation-history.component.html',
  styleUrl: './donor-donation-history.component.css'
})
export class DonorDonationHistoryComponent implements OnInit {

  currentUser:any = localStorage.getItem('currentUser')
  currentUserDecoded:any = jwtDecode(this.currentUser)
  userId = this.currentUserDecoded.id

  donations: Donation[];
  errorMessage!:string;  
  constructor(private rest:DonationsService, private route: ActivatedRoute, private router:Router){
    this.donations = [];
  }

  ngOnInit(): void {
    this.getDonations()
  }

  getDonations(){
    this.rest.getDonationsByDonor(this.userId).subscribe({next:(data: Donation[]) => {
      console.log(data);
      this.donations = data;},
      error: (error) =>{
        this.errorMessage = error;
      }
    })
  }

  viewDetails(id:string){
    this.router.navigate(['/donor/donation-details/' + id])
  }

}
