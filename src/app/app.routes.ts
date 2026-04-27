import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { MainPageComponent } from './components/main-page/main-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    canActivate: [authGuard]
  },
  {
    path: 'workflow',
    loadChildren: () => import('./components/bpmn-module/bpmn-module').then((m) => m.BpmnModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/main'
  }
];
