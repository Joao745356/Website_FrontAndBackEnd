import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from '../../../services/users-service.service';
import { catchError, forkJoin, of } from 'rxjs';
import { Partner } from '../../../models/partnerModel';

@Component({
  selector: 'app-instituitions-scrollable-page',
  templateUrl: './instituitions-scrollable-page.component.html',
  styleUrls: ['./instituitions-scrollable-page.component.css']
})
export class InstituitionsScrollablePageComponent implements OnInit {

  partnersWithImages: { partner: Partner, imageData: string }[] = [];
  errorMessage!:String

  constructor(private userService: UsersServiceService) { }

  ngOnInit(): void {
    this.userService.getPartners().subscribe({
      next: (data: Partner[]) => {
        this.fetchImages(data);
      },
      error: err => this.errorMessage = err
    });
  }

  fetchImages(partners: Partner[]): void {
    const imageObservables = partners.map(partner =>
      this.userService.getImage(partner.imageName as string).pipe(
        catchError(error => {
          console.error(`Error fetching image ${partner.imageName}:`, error);
          return of(null); // Return null if there is an error
        })
      )
    );

    forkJoin(imageObservables).subscribe({
      next: (blobs: (Blob | null)[]) => {
        blobs.forEach((blob, index) => {
          if (blob) {
            this.createImageFromBlob(blob, partners[index]);
          }
        });
      },
      error: err => this.errorMessage = err
    });
  }

  createImageFromBlob(image: Blob, partner: Partner): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.partnersWithImages.push({ partner, imageData: reader.result as string });
    }, false);

    reader.addEventListener("error", () => {
      console.error("Error reading image file");
    });

    if (image) {
      reader.readAsDataURL(image);
    } else {
      console.error("Received null image");
    }
  }
}