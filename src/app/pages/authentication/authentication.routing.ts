import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivationComponent } from "./feature-register/activation/activation.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'activation', component: ActivationComponent },
  { path: '', redirectTo: '/login' }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
