import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  public users: any =[];
  public name: string = ""
  constructor(private authService: AuthService, private userService: UserService, private userStore: UserStoreService){

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

    this.userStore.getNameFromStore().subscribe(value=>{
      let nameFromToken = this.authService.getNameFromToken();
      this.name = value || nameFromToken;
    })
  }

  logout(){
    this.authService.signOut();
  }
}
