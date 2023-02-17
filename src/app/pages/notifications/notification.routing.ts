
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotificationsComponent } from "./notifications.component";

const routes: Routes = [
  { path: '', component: NotificationsComponent },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
