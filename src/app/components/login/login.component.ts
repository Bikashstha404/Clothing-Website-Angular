import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import ValidateForm from '../helpers/validateForm';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  isText: boolean = false;
  type: string = "password";
  eyeIcon: string = "fa-eye-slash";

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log("Login Form Data: ",this.loginForm.value);
      this.apiService.login(this.loginForm.value).subscribe({
        next: (response) => {
          alert("Login Successful");
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          alert(err?.error.message)
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")
    }
  }

}
