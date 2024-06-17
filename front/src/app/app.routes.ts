import { Routes } from '@angular/router';
import { EditComponent } from './pages/home/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/home/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'home' },
];
