import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private apiService: ApiService, private router: Router){
    
  }
  loginObj: any ={
    email: '',
    password: '',
  }

  login(){
    this.apiService.login(this.loginObj).subscribe(
      response=>{
        console.log("Login Successful")
        this.apiService.storeToken(response.token);
        this.router.navigate(['/home']);
      },
      error=>{
        console.log("Login Failed.")
      }
    )
  }
}
