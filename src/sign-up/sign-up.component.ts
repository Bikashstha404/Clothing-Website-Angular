import { Component } from '@angular/core';
import { ApiService } from '../app/api.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private apiService: ApiService){

  }
  signUpObj:any={
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  signUp(){
    if(this.signUpObj.password != this.signUpObj.confirmPassword){
      alert("Both Password and Confirm Password should be same.")
    }

    this.apiService.signUp(this.signUpObj).subscribe(
      response => {
        console.log("Registration Successfull.")
      },
      error =>{
        console.log("Error Occured during registration.")
      }
    )
  }
}
