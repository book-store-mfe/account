import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/account-form/account-form.component').then(m => m.AccountFormComponent)
  }
];
