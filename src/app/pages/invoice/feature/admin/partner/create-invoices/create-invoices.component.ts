import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Registration, WorkEfforts } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { addDays, endOfWeek, isBefore, startOfWeek, subDays } from 'date-fns';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { InvoiceService } from 'src/app/pages/invoice/invoice.service';
import { SkillOwnerControllerService } from 'src/app/api/flexcub-api/services';
import { ownerImgUrl } from 'src/app/core/constants/constant';
import { IWorkEfforts } from 'src/app/core/models';


@Component({
  selector: 'app-create-invoices',
  templateUrl: './create-invoices.component.html',
  styleUrls: ['./create-invoices.component.scss']
})
export class CreateInvoicesComponent implements OnInit {
  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;

  step: number = 1;
  user!:Registration
  ownerDetails:IWorkEfforts[]=[]
  date: any;
  selectedDueDate!: Date;
  selectedWeek: Date = startOfWeek(new Date(), { weekStartsOn: 0 });
  startDate: any;
  end: any;
  today = new Date();
  endDate: Date = new Date();
  maxDate: Date = endOfWeek(new Date(), { weekStartsOn: 0 });
  bgConfig: Partial<BsDatepickerConfig> = { isAnimated: true, selectWeek: true, dateInputFormat: 'MM-DD-YYYY', containerClass: 'theme-dark-blue' };
  soImgUrl = ownerImgUrl;
  partnerId!:number;
  partnerName!:string;
  taxid!:string;
  location!:string;
  array: any = []
  array2: any = []
  finalAmt!: number;
  finalHours!: number;
  finalCount!: number;
  constructor(
    private readonly _appService: AppService,
    private readonly invoiceService: InvoiceService,
    ) {
    this.user = this._appService.user;
   }

  ngOnInit(): void {
    this.selectedDueDate = new Date(new Date().getTime() + 42 * 24 * 60 * 60 * 1000);
    this.partnerId = this.user?.id as number;
    this.partnerName = this.user?.businessName as string ;
    this.taxid = this.user?.taxIdBusinessLicense as string;
    this.location = this.user?.city as string
  }

  next(i: number): void {
    this.step = i;
  }

  getAnswers(data: WorkEfforts, event:any) {
    if (event.checked) {
      const index = this.array.findIndex((object: { skillOwnerId: number | undefined; }) => object.skillOwnerId === data.skillOwnerEntityId);
      const index2 = this.ownerDetails.findIndex((object) => object.skillOwnerEntityId === data.skillOwnerEntityId);
      this.ownerDetails[index2].checkbox1 = true;
      if (index === -1) {
        var data2 = {
          skillSeekerId: data.skillSeekerEntityId,
          skillSeekerProjectId: data.skillSeekerProjectEntityId,
          skillOwnerId: data.skillOwnerEntityId,
          totalHours: data.totalHours,
          amount: data.amount,
        };
        this.array.push(data);
        this.array2.push(data2);
      }
    } else {
      const index2 = this.ownerDetails.findIndex((object) => object.skillOwnerEntityId === data.skillOwnerEntityId);
      this.ownerDetails[index2].checkbox1 = false;
      const index = this.array.findIndex((object: { skillOwnerId: number | undefined; }) => object.skillOwnerId === data.skillOwnerEntityId);
      this.array.splice(index, 1);
      this.array2.splice(index, 1);
    }
    this.finalAmt = this.array?.reduce((n:number, { amount }:any) => n + amount, 0);
    this.finalCount = this.array?.length;
    this.finalHours = this.array.reduce((n:number, { totalHours }:any) => n + totalHours, 0);
  }


  buildWeekOptions(j?: Date): void {
    if (j) {
      const date = startOfWeek(j, { weekStartsOn: 0 });
      const date2 = endOfWeek(j, { weekStartsOn: 0 });
      (this.startDate = this._appService.convertTime(date)),
        (this.end = this._appService.convertTime(date2)),
        this.getOwnersByPartners(this.partnerId, this.startDate, this.end);
    }
  }

  weekChange(position: 'next' | 'previous'): void {
    const next = () => {
      const j = addDays(startOfWeek(this.selectedWeek), 7);
      const k = isBefore(j, this.maxDate);
      if (!k) return;
      this.selectedWeek = j;
    };
    const previous = () => {
      const j = subDays(startOfWeek(this.selectedWeek), 7);
      this.selectedWeek = j;
    };
    position === 'next' ? next() : position === 'previous' ? previous() : null;
  }

  getOwnersByPartners(partnerId: number, startDate: string, endDate: string) {
    this.invoiceService.getOwnersByPartners(partnerId, startDate, endDate).subscribe(
      (res) => {
        this.ownerDetails = res;
        for (let i = 0; i < this.ownerDetails.length; i++) {
          this.invoiceService.downloadImage(this.ownerDetails[i]?.skillOwnerEntityId as number).subscribe(
            (res) => {
              this.ownerDetails[i]['image']=this.soImgUrl + this.ownerDetails[i].skillOwnerEntityId;
            },
            (err) => {
              if (err.status == 200) {
                this.ownerDetails[i]['image'] = this.soImgUrl + this.ownerDetails[i].skillOwnerEntityId;
              } else {
                this.ownerDetails[i]['image'] = `assets/images/avatar-default-skillowner.png`;
              }
            }
          );
        }
      },
      (err) => {
        this.ownerDetails = [];
        this._appService.toastr(err, { icon: 'error' });
      }
    );
  }
}



