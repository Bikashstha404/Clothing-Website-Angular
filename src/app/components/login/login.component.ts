import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import ValidateForm from '../helpers/validateForm';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../services/user-store.service';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private userStore: UserStoreService, private router: Router, private toast: NgToastService, private toastr: ToastrService, private resetService: ResetPasswordService) {
    this.loginForm = this.fb.group({
      email: ['stha.bikam99@gmail.com', [Validators.required, Validators.email]],
      password: ['Bikash@123', Validators.required]
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

  public resetPasswordEmail!: string;
  public isVaidEmail!: boolean;


  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    this.isVaidEmail = pattern.test(value);
    return this.isVaidEmail;
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
        next: (res)=>{
          this.resetPasswordEmail=""
          const buttonRef = document.getElementById("closeBtn");
          buttonRef?.click()
          console.log("Email sent for the reset password")
        },
        error: (err)=>{
          // this.toast.error("")
          console.log("Error during sending resetPassword Link: ", err?.error.message)
        }
      })
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log("Login Form Data: ", this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // alert("Login Successful");
          this.authService.storeToken(response.accessToken);
          this.authService.storeRefreshToken(response.refreshToken)
          this.toast.success("Login Successful", "SUCCESS", 5000);
          // this.toastr.success("Login Successful", "SUCCESS");
          this.loginForm.reset();
          let userPayload = this.authService.decodedToken();
          console.log("UserPayload: ", userPayload);
          const name = userPayload.Name;
          const role = userPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          this.userStore.setNameForStore(name);
          this.userStore.setRoleForStore(role);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          console.log("error message", err?.error.message)
          this.toast.danger(err?.error.message, "ERROR", 5000);
          this.toastr.error(err?.error.message, "ERROR");
          // alert(err?.error.message)
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")
    }
  }

}
