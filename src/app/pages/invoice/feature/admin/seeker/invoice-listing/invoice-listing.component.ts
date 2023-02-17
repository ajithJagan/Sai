import { Component, OnInit } from '@angular/core';
import { InvoiceDetails } from 'src/app/api/flexcub-api/models/invoice-details';
import { InvoiceStatus } from 'src/app/api/flexcub-api/models/invoice-status';
import { Registration } from 'src/app/api/flexcub-api/models/registration';
import { AppService } from 'src/app/app.service';
import { InvoiceService } from 'src/app/pages/invoice/invoice.service';



@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {
  user: Registration;
  invoiceDetails: InvoiceDetails[] = [];
  invoiceStatusList: InvoiceStatus[] = [];
  constructor(
    private readonly _appService: AppService,
    private readonly _service: InvoiceService) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.getAllInvoiceDetails();
    this.getInvoiceStatus();
  }

  getAllInvoiceDetails(): void {
    const id = this.user?.id;
    this._service.getAdminInvoiceBySeeker(id as number).subscribe((res) => {
      this.invoiceDetails = res;
    });
  }

/*   updateStatus(invoiceid:number, statusid:number, status:string, comment:string) {
    Swal.fire({
      title: 'Are you sure?',
      text: `The status will be changed to ${status}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (status === 'Rejected') {
          const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Comments',
            inputPlaceholder: 'Type your Comments here...',
            inputValue: comment,
            inputAttributes: {
              'aria-label': 'Type your Comments here',
            },
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'You need to write something!';
              }
            },
          });

          if (text) {
            const id = this.user?.id;
            this._service.updateSeekerInvoiceStatus(invoiceid, statusid, text).subscribe(
              (res) => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: `${status} successfully`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.getAllInvoiceDetails();
              },
              (error) => {
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: error,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            );
          }
        } else {
          this._service.updateSeekerInvoiceStatus(invoiceid, statusid, 'NA').subscribe(
            (res) => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${status} successfully`,
                showConfirmButton: false,
                timer: 1500,
              });
              this.getAllInvoiceDetails();
            },
            (error) => {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: error,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          );
        }
      }
    });
  } */

  getInvoiceStatus() {
    this._service.getInvoiceStatus().subscribe((res) => {
      this.invoiceStatusList = res;
      console.log(this.invoiceStatusList);
    });
  }


}
