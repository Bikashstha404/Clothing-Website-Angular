import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../app/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private apiService: ApiService){
    
  }
  loginObj: any ={
    email: '',
    password: '',
  }

  login(){
    this.apiService.login(this.loginObj).subscribe(
      response=>{
        console.log("Login Successful")
      },
      error=>{
        console.log("Login Failed.")
      }
    )
  }
}
