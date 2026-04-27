import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
