import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { Gender } from '../enums/gender.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  genderOptions = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
    { value: 2, label: 'Other' }
  ];
  constructor(private apiService: ApiService){
    
  }
  signUpObj: any ={
    name: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: ''
  }

  signUp(){
    if(this.signUpObj.password != this.signUpObj.confirmPassword){
      alert("Password and confirm password should be same.")
    }

    this.signUpObj.gender = parseInt(this.signUpObj.gender, 10);
    
    this.apiService.signUp(this.signUpObj).subscribe(
      response=>{
        console.log("Registration Successful")
      },
      error=>{
        console.log("Error Occured During Registration.")
      }
    )
  }
}
