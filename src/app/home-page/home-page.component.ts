import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private api: ApiService){

  }

  logOut(){
    this.api.signOut();
  }
}
