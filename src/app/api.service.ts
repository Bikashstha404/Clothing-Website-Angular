import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  signUp(model:any):Observable<void>{
    return this.http.post<void>(`http://localhost:5131/api/Auth/SignUp`,model)
  }
}
