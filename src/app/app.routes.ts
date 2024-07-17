import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';


export const routes: Routes = [
    {path: 'signUp', component: SignUpComponent },
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomePageComponent}
];
