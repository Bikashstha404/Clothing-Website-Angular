import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:5143/api/Auth/";

  constructor(private http: HttpClient, private router: Router) {

  }

  signUp(signUpObj: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}SignUp`, signUpObj);
  }

  login(loginObj: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Login`, loginObj);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  signOut(){
    localStorage.clear();
    // localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
