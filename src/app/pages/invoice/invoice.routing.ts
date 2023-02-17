import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateInvoiceComponent } from "./create-invoice/create-invoice.component";
import { AdminListComponent } from "./feature/admin/admin-list/admin-list.component";
import { CreateInvoicesComponent } from "./feature/admin/partner/create-invoices/create-invoices.component";
import { PartnerInvoicelistComponent } from "./feature/admin/partner/partner-invoicelist/partner-invoicelist.component";
import { PreviewAdminComponent } from "./feature/admin/preview-admin/preview-admin.component";

import { InvoiceListingComponent } from "./feature/admin/seeker/invoice-listing/invoice-listing.component";
import { PreviewInvoiceComponent } from "./feature/admin/seeker/preview-invoice/preview-invoice.component";
import { InvoiceComponent } from "./invoice.component";
const routes: Routes = [
  { path: '', component: InvoiceComponent },
  { path: 'invoice-list', component: InvoiceListingComponent },
  { path: 'preview-invoice', component: PreviewInvoiceComponent },
  { path: 'admin-list', component: AdminListComponent },
  { path: 'create-invoice', component: CreateInvoiceComponent },
  { path: 'preview-invoices', component: PreviewAdminComponent },
  { path: 'partner-list', component: PartnerInvoicelistComponent },
  { path: 'create-invoices', component: CreateInvoicesComponent }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
