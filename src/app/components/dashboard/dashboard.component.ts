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
  public name: string = "";
  public role: string = "";
  constructor(private authService: AuthService, private userService: UserService, private userStore: UserStoreService){

  }

  ngOnInit(): void{
    this.userService.getAllUsers().subscribe({
      next: (response)=>{
        this.users = response;
        console.log("Users:   ", this.users)
      },
      error: (err)=>{
        console.log("Error fetching users: ", err)
      }
    })

    this.userStore.getNameFromStore().subscribe(value=>{
      let nameFromToken = this.authService.getNameFromToken();
      this.name = value || nameFromToken;
    })

    this.userStore.getRoleFromStore().subscribe(value=>{
      let roleFromToken = this.authService.getRoleFromToken();
      this.role = value || roleFromToken;
    })

    console.log("Name", this.name, "  Role: ", this.role)
  }

  logout(){
    this.authService.signOut();
  }
}
