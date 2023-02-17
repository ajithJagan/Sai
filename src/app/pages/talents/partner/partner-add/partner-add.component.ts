import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { SkillOwnerEntity } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { emailRegex, excelDocViewer, phoneRegex } from 'src/app/core/constants/constant';
import { TalentsService } from '../../talents.service';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent implements OnInit {
  form!: FormGroup;
  docFile: string = excelDocViewer;
  bsConfig: Partial<BsDatepickerConfig> = { isAnimated: true, dateInputFormat: 'MM-DD-YYYY', containerClass: 'theme-dark-blue' };
  maxDate: Date = new Date();

  constructor(
    private readonly _service: TalentsService,
    private readonly _appService: AppService,
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'firstName': [null, [Validators.required]],
      'lastName': [null, [Validators.required]],
      'dob': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.pattern(emailRegex)]],
      'phone': [null, [Validators.required, Validators.pattern(phoneRegex)]],
      '_phone': [null, [Validators.pattern(phoneRegex)]],
      'rate': [null, [Validators.required]]
    });
  }

  saveTalent(): void {
    if (!this.form?.valid) return;
    const { value } = this.form;

    const j: SkillOwnerEntity = {
      skillPartnerEntity: {
        skillPartnerId: this._appService.user?.id as number,
      },
      firstName: value?.firstName,
      lastName: value?.lastName,
      dob: this.datePipe.transform(value?.dob, 'yyyy-MM-dd') as string,
      primaryEmail: value?.email,
      phoneNumber: value?.phone,
      alternatePhoneNumber: value?._phone,
      rate: value?.rate
    };
    this._service.saveTalent(j)
      .subscribe(() => {
        this._appService.toastr('Talent profile created successfully', { icon: 'success', text: 'Talent profile added successfully and activation mail has been sent to email address.' })
      }, (err) => this._appService.toastr(err))
  }

  downloadTemplate(): void {
    this._service.downloadTemplate()
      .subscribe((j) => {
        var url = window.URL.createObjectURL(new Blob([j]));
        const a = document.createElement('a');
        a.href = url;
        a?.setAttribute('download', `sampleTemplate.doc`);
        document?.body?.appendChild(a);
        a?.click();
      }, (err) => this._appService.toastr(err));
  }

  onlyNumber(e: KeyboardEvent): void {
    this._appService.onlyNumber(e);
  }

  get f() {
    return this.form.controls;
  }
}
