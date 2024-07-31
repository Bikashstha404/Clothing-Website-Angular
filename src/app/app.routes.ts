import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './components/guards/auth.guard';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'signUp', component: SignUpComponent},
    {path:'dashboard', component: DashboardComponent}, //, canActivate:[authGuard]}
];
