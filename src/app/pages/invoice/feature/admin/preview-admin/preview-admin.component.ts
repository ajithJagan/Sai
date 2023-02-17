import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import html2canvas from 'html2canvas';
import { filter } from 'rxjs';
import { InvoiceDetailResponse } from 'src/app/api/flexcub-api/models';
import { InvoiceService } from '../../../invoice.service';

@Component({
  selector: 'app-preview-admin',
  templateUrl: './preview-admin.component.html',
  styleUrls: ['./preview-admin.component.scss']
})
export class PreviewAdminComponent implements OnInit {
  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;
  invoiceId!: number;
  invoiceDetails:InvoiceDetailResponse[]=[]
  finalAmt!: number;
  finalHours!: number;
  finalCount!: number;
  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly _service: InvoiceService
  ) { }

  ngOnInit(): void {
    this.activateRoute.queryParams
      .pipe(filter((param: Params) => !!param && !!param?.invoiceId && !!param?.isSkillPartner))
      .subscribe((param: Params) => {
        this.invoiceId = param.invoiceId;
        this.getInvoiceDetails(param.invoiceId, param.isSkillPartner);
      });
  }


  getInvoiceDetails(id: string,isSp:boolean) {
    this._service.getInvoiceByInvoiceId(id, isSp).subscribe((res) => {
      this.invoiceDetails.push(res)
      this.finalAmt = this.invoiceDetails[0]?.invoiceData?.reduce((n, { amount }: any) => n + amount, 0) as number;
      this.finalCount = this.invoiceDetails[0]?.invoiceData?.length as number;
      this.finalHours = this.invoiceDetails[0]?.invoiceData?.reduce((n, { totalHours }: any) => n + totalHours, 0) as number;
    });
  }

  download() {
    html2canvas(this.screen.nativeElement).then((canvas) => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'invoice.png';
      this.downloadLink.nativeElement.click();
    });
  }


}
