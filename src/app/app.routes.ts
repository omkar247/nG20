import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
     {
    path: '',
    component: HomeComponent,
    title: 'Home - Angular 20 Demo'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About - Angular 20 Demo'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
