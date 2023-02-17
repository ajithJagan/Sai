import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ERole } from 'src/app/core/models';
import { UnauthorizedComponent } from '../shared';
import { AdminComponent } from './feature/admin/admin.component';
import { PartnerComponent } from './feature/admin/partner/partner.component';
import { SeekerComponent } from './feature/admin/seeker/seeker.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  component: any;

  constructor(
    private readonly _appService: AppService) {

    const j = [
      { role: ERole.ADMIN, ref: AdminComponent},
      { role:ERole.SEEKER, ref:SeekerComponent},
      { role:ERole.PARTNER, ref:PartnerComponent},
    ];

    const i = j.findIndex(e => e?.role === this._appService.user?.roles?.rolesId) ?? -1;
    this.component = i > -1 ? j[i].ref : UnauthorizedComponent;
  }

  ngOnInit(): void {
  }

}
