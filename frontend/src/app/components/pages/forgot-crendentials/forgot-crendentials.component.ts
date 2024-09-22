import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRestService } from '../../../services/auth-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-crendentials',
  templateUrl: './forgot-crendentials.component.html',
  styleUrl: './forgot-crendentials.component.css',
})
export class ForgotCrendentialsComponent implements OnInit {
  forgotForm!: FormGroup;

  constructor(private fb: FormBuilder, private rest: AuthRestService, private router: Router) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.get('email')?.value;

      if (email) {
        this.rest.recoveryPasswordEmail({ email }).subscribe(
          response => {
            alert('Please check your inbox!');
            this.forgotForm.reset();
          },
          error => {
            alert('An error occurred: ' + error);
          }
        );
      }
    }
  }
}