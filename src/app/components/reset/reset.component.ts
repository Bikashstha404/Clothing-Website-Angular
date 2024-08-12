import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPassword } from '../model/reset-password-model';
import { CommonModule } from '@angular/common';
import { ConfirmPasswordValidtors } from '../helpers/confirm-password.validators';
import { ActivatedRoute, Route, Router } from '@angular/router';
import ValidateForm from '../helpers/validateForm';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  constructor(private router: Router,private fb: FormBuilder, private activatedRoute: ActivatedRoute, private resetService: ResetPasswordService){
    this.resetPasswordForm = this.fb.group({
      password:[null, Validators.required],
      confirmPassword: [null, Validators.required]
    },{
      validator: ConfirmPasswordValidtors('password', 'confirmPassword')
    })

    this.activatedRoute.queryParams.subscribe(value=>{
      this.emailToReset = value['email'];
      let urlToken = value['code'];
      this.emailToken = urlToken.replace(/ /g, '+');

    })
  }


  OnReset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj).subscribe({
        next: (res)=>{
          console.log("Succesfully changed password.")
          this.router.navigate(['/']);
        },
        error: (err)=>[
          console.log("Error occured during changing password: ", err?.error.message)
        ]
      })
    }else{
      ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
  }

  isText: boolean = false;
  type: string ="password";
  eyeIcon: string = "fa-eye-slash";
  
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
