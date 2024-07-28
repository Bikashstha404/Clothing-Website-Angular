import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  public users: any =[];

  constructor(private authService: AuthService, private userService: UserService){

  }

  ngOnInit(){
    this.userService.getAllUsers().subscribe({
      next: (response)=>{
        this.users = response;
      },
      error: (err)=>{
        console.log(err?.error.message)
      }
    })
  }

  logout(){
    this.authService.signOut();
  }
}
