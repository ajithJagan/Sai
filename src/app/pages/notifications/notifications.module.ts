import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { routing } from './notification.routing';
import { MaterialModule } from 'src/app/material.module';
import { PartnerComponent } from './feature/partner/partner.component';
import { OwnerComponent } from './feature/owner/owner.component';
import { SeekerComponent } from './feature/seeker/seeker.component';
import { SharedModule } from '../shared';



@NgModule({
  declarations: [
    NotificationsComponent,
    PartnerComponent,
    OwnerComponent,
    SeekerComponent
  ],
  imports: [
    CommonModule,
    routing,
    MaterialModule,
    SharedModule
  ]
})
export class NotificationsModule { }
