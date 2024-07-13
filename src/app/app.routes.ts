import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

export const routes: Routes = [
    {path:'', component: AppComponent},
    {path:'login', component: LoginComponent},
    {path: 'signUp', component: SignUpComponent}
];
