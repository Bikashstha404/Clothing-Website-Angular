import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import ValidateForm from '../helpers/validateForm';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.signUpForm = this.fb.group({
      name:['', Validators.required],
      gender:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:['', Validators.required],
      confirmPassword:['', Validators.required]
    })
  }

  genderOptions = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
    { value: 2, label: 'Other' }
  ];

  genderIcon: string = "fa-question-circle";
  changeGenderIcon(){
    const genderValue = this.signUpForm.value.gender;
    if(genderValue == 0){
      this.genderIcon = "fa-mars";
    }
    else if(genderValue == 1){
      this.genderIcon = "fa-venus"
    }
    else{
      this.genderIcon = "fa-transgender-alt"
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

  onSignUp(){
    if(this.signUpForm.valid){
      // if(this.signUpForm.value.password != this.signUpForm.value.confirmPassword){
      //   alert("Both Password and Confirm Password should be same.")
      // }
      const formValue = this.signUpForm.value;
      formValue.gender = parseInt(formValue.gender);
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: (response)=>{
          alert("Registration Successfull")
          this.signUpForm.reset()
          this.router.navigate(['login']);
        },
        error: (err)=>{
          alert(err?.error.message);
        }
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.signUpForm)
    }
  }
}
