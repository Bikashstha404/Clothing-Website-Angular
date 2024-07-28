import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import ValidateForm from '../helpers/validateForm';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toast: NgToastService,private toaster: ToastrService ) {
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
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // alert("Login Successful");
          this.authService.storeToken(response.token);
          this.toast.success("Login Successful", "SUCCESS", 5000);
          this.toaster.success("Login Successful", "SUCCESS");
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.toast.danger(err?.error.message, "ERROR", 5000);
          this.toaster.error(err?.error.message, "ERROR");
          // alert(err?.error.message)
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")
    }
  }

}
