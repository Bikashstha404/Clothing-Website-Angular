import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

  signUp(signUpObj: any): Observable<void> {
    return this.http.post<any>('http://localhost:5143/api/Auth/SignUp', signUpObj);
  }

  login(loginObj: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5143/api/Auth/Login`, loginObj);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  signOut(){
    localStorage.clear();
    // localStorage.removeItem('token');
    this.router.navigate(["/login"]);
  }
}
