import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:5143/api/Auth/";
  private userPaylod: any;

  constructor(private http: HttpClient, private router: Router, private userStore: UserStoreService) {
    this.userPaylod = this.decodedToken();
  }

  signUp(signUpObj: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}SignUp`, signUpObj);
  }

  login(loginObj: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Login`, loginObj);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
    console.log(this.userPaylod)
    const name = this.userPaylod.Name;
    this.userStore.setNameForStore(name);
  }

  getToken(): string | null{
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  signOut(){
     if (this.isBrowser()) {
      localStorage.clear();
      // localStorage.removeItem('token');
      this.router.navigate(['login']);
    }
  }
  
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token)
  }

  getNameFromToken(){
    if(this.userPaylod){
      return this.userPaylod.Name;
    }
  }

  getRoleFromToken(){
    if(this.userPaylod){
      return this.userPaylod.Gender;
    }
  }
}
