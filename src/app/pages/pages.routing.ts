import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(n => n.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(n => n.ProfileModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(n => n.InvoiceModule),
      },
      {
        path: 'jobs',
        loadChildren: () => import('./jobs/jobs.module').then(n => n.JobsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'contracts',
        loadChildren: () => import('./contracts/contracts.module').then(n => n.ContractsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'hiring',
        loadChildren: () => import('./hiring/hiring.module').then(n => n.HiringModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then(n => n.NotificationsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'talents',
        loadChildren: () => import('./talents/talents.module').then(n => n.TalentsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(n => n.ProjectsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'employees-role',
        loadChildren: () => import('./employees-role/employees-role.module').then(n => n.EmployeesRoleModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'unauthorized',
        loadChildren: () => import('./unauthorized/unauthorized.module').then(n => n.UnauthorizedModule),
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then(n => n.AuthenticationModule)
  },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
