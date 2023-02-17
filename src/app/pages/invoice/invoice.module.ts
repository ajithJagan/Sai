import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { AdminComponent } from './feature/admin/admin.component';
import { routing } from './invoice.routing';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeekerComponent } from './feature/admin/seeker/seeker.component';
import { InvoiceListingComponent } from './feature/admin/seeker/invoice-listing/invoice-listing.component';
import { PreviewInvoiceComponent } from './feature/admin/seeker/preview-invoice/preview-invoice.component';
import { PartnerComponent } from './feature/admin/partner/partner.component';
import { PartnerInvoicelistComponent } from './feature/admin/partner/partner-invoicelist/partner-invoicelist.component';
import { CreateInvoicesComponent } from './feature/admin/partner/create-invoices/create-invoices.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AdminListComponent } from './feature/admin/admin-list/admin-list.component';
import { PreviewAdminComponent } from './feature/admin/preview-admin/preview-admin.component';
import { SharedModule } from '../shared';
import { PreviewPartnerComponent } from './feature/admin/partner/preview-partner/preview-partner.component';



@NgModule({
  declarations: [
    InvoiceComponent,
    AdminComponent,
    CreateInvoiceComponent,
    SeekerComponent,
    InvoiceListingComponent,
    PreviewInvoiceComponent,
    PartnerComponent,
    PartnerInvoicelistComponent,
    CreateInvoicesComponent,
    AdminListComponent,
    PreviewAdminComponent,
    PreviewPartnerComponent

  ],
  imports: [
    CommonModule,
    TabsModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    SharedModule
  ]
})
export class InvoiceModule { }
