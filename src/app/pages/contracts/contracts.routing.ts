import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractsComponent } from "./contracts.component";

const routes: Routes = [
  { path: '', component: ContractsComponent }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);