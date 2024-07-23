import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.signUpForm = this.fb.group({
      name:['', Validators.required],
      gender:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:['', Validators.required],
      confirmPassword:['', Validators.required]
    })
  }

  genderOptions = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
    { value: 2, label: 'Other' }
  ];
  
  isText: boolean = false;
  type: string ="password";
  eyeIcon: string = "fa-eye-slash";
  
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignUp(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
    }
  }

}
