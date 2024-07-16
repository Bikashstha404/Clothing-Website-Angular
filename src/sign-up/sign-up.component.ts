import { Component } from '@angular/core';
import { ApiService } from '../app/api.service';
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
  signUpObj: any ={
    name: '',
    email: '',
    gender: null,
    password: '',
    confirmPassword: ''
  }

  signUp(){
    if(this.signUpObj.password != this.signUpObj.confirmPassword){
      alert("Password and confirm password should be same.")
    }

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
