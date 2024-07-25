import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:5143/api/Auth/";

  constructor(private http: HttpClient) {

  }

  signUp(signUpObj: any){
    return this.http.post<any>(`${this.baseUrl}SignUp`, signUpObj);
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}Login`, loginObj);
  }
}
