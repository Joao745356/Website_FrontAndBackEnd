import { Component, OnInit } from '@angular/core';
import { DonationsService } from '../../../services/donations.service';
import { UsersServiceService } from '../../../services/users-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationRequest, DonorEmail, Institution, Quality, Location } from '../../../models/donationRequest';
import { CollectionPoint } from '../../../models/collectionPoint';
import { Partner } from '../../../models/partnerModel';
import {jwtDecode} from 'jwt-decode';
import { Donor } from '../../../models/donorModel';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-make-donation-request',
  templateUrl: './make-donation-request.component.html',
  styleUrls: ['./make-donation-request.component.css']
})
export class MakeDonationRequestComponent implements OnInit {

  currentUser: any = localStorage.getItem('currentUser');
  currentUserDecoded: any = jwtDecode(this.currentUser);
  userId = this.currentUserDecoded.id;
  donor!: Donor;

  institution!: Institution;
  location!: CollectionPoint;
  quantity!: number;
  quality!: Quality;
  dateToCollect!: Date;
  state: 'Waiting' = 'Waiting';

  collectionPoints!: CollectionPoint[];
  partners!: Partner[];

  errorMessage!: string;

  constructor(
    private donService: DonationsService,
    private userService: UsersServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.donService.getCollectionPoints().subscribe({
      next: (data) => {
        this.collectionPoints = data;
      },
      error: (err) => this.errorMessage = err.error ? err.error : 'Error fetching collection points'
    });

    this.userService.getPartners().subscribe({
      next: (data) => {
        this.partners = data;
      },
      error: (err) => this.errorMessage = err.error ? err.error : 'Error fetching partners'
    });

    this.userService.getDonor(this.userId).subscribe({
      next: (data) => {
        this.donor = data;
      },
      error: (err) => this.errorMessage = err.error ? err.error : 'Error fetching donor details'
    });
  }

  onSubmit(): void {
    if (!this.donor) {
      this.errorMessage = 'Donor information is missing';
      return;
    }

    const donationRequest = new DonationRequest(
      { email: this.donor.email, _id: this.userId },
      this.institution,
      this.location,
      this.quantity,
      this.quality,
      this.dateToCollect
    );

    this.donService.makeDonationRequest(donationRequest).subscribe({
      next: (result: any) => {
        console.log(result);
        this.resetForm();
        this.router.navigate(['/donor/donation-requests']);
      },
      error: (error: any) => {
        this.errorMessage = error.error ? error.error : 'Error making donation request';
      }
    });
  }

  static dateNotBeforeToday(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today ? { dateNotBeforeToday: true } : null;
  }

  private resetForm(): void {
    this.quantity = 0;
    this.quality = Quality.Fair;
    this.dateToCollect = new Date();
  }
}
