import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestService } from '../../../services/auth-rest.service';

@Component({
  selector: 'app-register-partner',
  templateUrl: './register-partner.component.html',
  styleUrl: './register-partner.component.css'
})
export class RegisterPartnerComponent {
  email!: string;
  password!: string;
  name!: string;
  description!: string;
  selectedFile: File | null = null;
  imageFileName: string = '';
  message!:string;

  errorMessage!:string;


  constructor(
    private router: Router,
    private authService: AuthRestService,
  ) {}
     
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.imageFileName = this.selectedFile.name;
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      this.authService.registerPartner(this.selectedFile, this.name, this.password, this.email, this.description)
        .subscribe((result: any) => {
          console.log(result);
          this.resetForm();
          this.message = result.message || 'Partner registered successfully';
          alert("Please await the approval of your request, an administrator will come in contact with you in due time!")
          this.router.navigate(['/'])
        }, (error: any) => {
          console.error(error);
          this.message = 'Error registering partner';
          this.errorMessage = error;
        });
    }
  }

  private resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.description = '';
    this.imageFileName = '';
    this.selectedFile = null;
  }
}
