import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/account-form/account-form.component').then(m => m.AccountFormComponent)
  },
];
