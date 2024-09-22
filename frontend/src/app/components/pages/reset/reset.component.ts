import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRestService } from '../../../services/auth-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from '../../../directives/passwordConfirm'; // Adjust path if needed

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})


export class ResetComponent implements OnInit {
  
  ResetForm!: FormGroup;
  token !: String;

  constructor(private fb: FormBuilder, private rest: AuthRestService, private router: Router, 
    private activeRoute: ActivatedRoute) {}


  ngOnInit(): void {

    this.ResetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: confirmPasswordValidator('password', 'confirmPassword') 
    });


      
    this.activeRoute.params.subscribe(val=> {
      this.token = val['token'];
    })

  }

  reset(){
    let resetObj = {
       token: this.token,
       password: this.ResetForm.value.password,
    }
    this.rest.resetPasswordService(resetObj).subscribe(
      response => {
        alert('We done did it mate!');
        this.ResetForm.reset();
        this.router.navigate(['login']);
      },
      error => {
        alert('An error occurred: ' + error);
      }
    );
  }
}

