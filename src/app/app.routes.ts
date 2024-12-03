import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'children',
    loadComponent: () =>
      import('./features/children/child-list/child-list.component').then(
        (m) => m.ChildListComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'parent' },
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/task-list/task-list.component').then(
        (m) => m.TaskListComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'child' },
  },
  {
    path: 'store',
    loadComponent: () =>
      import('./features/store/store-list/store-list.component').then(
        (m) => m.StoreListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    loadComponent: () =>
      import('./features/errors/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '500',
    loadComponent: () =>
      import('./features/errors/server-error/server-error.component').then(
        (m) => m.ServerErrorComponent
      ),
  },
  {
    path: '401',
    loadComponent: () =>
      import('./features/errors/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
  },
  {
    path: '403',
    loadComponent: () =>
      import('./features/errors/forbidden/forbidden.component').then(
        (m) => m.ForbiddenComponent
      ),
  },
  {
    path: '501',
    loadComponent: () =>
      import(
        './features/errors/not-implemented/not-implemented.component'
      ).then((m) => m.NotImplementedComponent),
  },
  { path: '**', redirectTo: '404' },
];
