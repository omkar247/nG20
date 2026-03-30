import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
     {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'Home - Demo'
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
    title: 'About - Demo'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Demo'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup - Demo'
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    title: 'Users - Demo'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
