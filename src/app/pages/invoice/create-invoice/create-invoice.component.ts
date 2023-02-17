import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { endOfWeek, startOfWeek } from 'date-fns';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AdminInvoice, ClientInvoiceDetails } from 'src/app/api/flexcub-api/models';
import { IAdminInvoice } from 'src/app/core/models';
import { InvoiceService } from '../invoice.service';


@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  step: number = 1;
  listOfClient:ClientInvoiceDetails[]= [];
  listOfProject:any = [];
  partnerInfo: IAdminInvoice[] = [];
  seekerName!: string;
  array: any = []
  array2: any = []
  finalAmt!: number;
  finalHours!: number;
  finalCount!: number;
  date!: Date;
  selectedDueDate: Date | undefined;
  selectedWeek: Date = startOfWeek(new Date(), { weekStartsOn: 0 });
  startDate!: Date;
  end!: Date;
  today = new Date();
  endDate: Date = new Date();
  maxDate: Date = endOfWeek(new Date(), { weekStartsOn: 0 });
  bgConfig: Partial<BsDatepickerConfig> = { isAnimated: true, selectWeek: true, dateInputFormat: 'MM/DD/YYYY', containerClass: 'theme-dark-blue' };
  checkbox1: boolean = false;
  constructor(
    private readonly invoiceservice: InvoiceService,
  ) { }

  ngOnInit(): void {
    this.invoiceClientDetails();
    this.selectedDueDate = new Date(new Date().getTime() + 42 * 24 * 60 * 60 * 1000)
  }

  clientForm = new FormGroup({
    client: new FormControl('', Validators.required),
    project: new FormControl('', Validators.required),
  });

  // constructor(private readonly invoiceservice: InvoiceService,) {

  // }

  // ngOnInit(): void {
  //   this.invoiceClientDetails();
  // }

  invoiceClientDetails() {
    this.invoiceservice.invoiceClientDetails().subscribe((res) => {
      this.listOfClient = res;
    });
  }

   onChangeClient(event: any) {
     this.clientForm.value.client;
     this.listOfProject = this.clientForm.value.client.clientProjects;
   }

   onChangeProject(event: Event) {
     this.invoiceservice.getPartnerInvoiceBySeeker(this.clientForm.value.client.skillSeekerId, this.clientForm.value.project.projectId).subscribe(
       (res) => {
        console.log(res);
         this.partnerInfo = res;
         this.seekerName = this.partnerInfo[0]?.client as string;
       },
     );
   }

  next(i: number): void {
    this.step = i;
  }

  getAnswers(data: AdminInvoice, event:any) {
    if (event.checked) {
      const index = this.array.findIndex((object: { invoiceDataId: number | undefined; }) => object.invoiceDataId === data.invoiceDataId);
      const index2 = this.partnerInfo.findIndex((object) => object.invoiceDataId === data.invoiceDataId);
      this.partnerInfo[index2].checkbox1= true;
    this.checkbox1= true;
      if (index === -1) {
        var data2 = {
          invoiceId: data.invoiceDataId,
        };
        this.array.push(data);
        this.array2.push(data2);
      }
    } else {
      const index2 = this.partnerInfo.findIndex((object) => object.invoiceDataId === data.invoiceDataId);
      this.partnerInfo[index2].checkbox1= false;
      const index = this.array.findIndex((object: { invoiceDataId: number | undefined; }) => object.invoiceDataId === data.invoiceDataId);
      this.array.splice(index, 1);
      this.array2.splice(index, 1);
    }
    this.finalAmt = this.array?.reduce((n: number, { amount }:any) => n + amount, 0);
    this.finalCount = this.array?.length;
    this.finalHours = this.array.reduce((n: number, { totalHours }: any) => n + totalHours, 0);
  }

}
