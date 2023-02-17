import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { JobDto, OwnerSkillDomain, OwnerSkillTechnologies, Registration, SkillSeekerProject } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  step: number = 1;
  maxEditorTextLength: number = 1500;
  currentEditorTextLength: number = 0;
  tabledata: JobDto[] = [];
  seekersId!: number;
  user: Registration;
  form: FormGroup;
  technologies: OwnerSkillTechnologies[] = [];
  domainList!: OwnerSkillDomain[];
  projectname: string = '';
  skillSeekerId: number;
  projectName!: SkillSeekerProject[];
  streets!: string[]
  filteredStreets!: Observable<string[]>;
  levels!: Observable<string[]>;
  selected!: string;
  activeButton!: string;
  activeButtons!: string;
  active!: string;
  role!: string;
  condition: boolean = true;
  condition1: boolean = true;
  levelExperience: any;
  Experience: string[] = ['0', '0+', '1+', '2+', '3+', '4+', '5+', '6+', '7+', '9+', '11+', '15+'];
  id1: number = 0;
  skills: string[] = [];
  _skills: any[] = [];
  remote: any;
  isLoading!: boolean;
  locations = new FormControl('');
  states: string[] = [];
  filteredOptions!: Observable<string[]>;
  addressData!: string[];
  hiringPriority: any;
  id3!: number;
  data!: string[];

  quillConfigs = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', { 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }]
    ]
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly jobsService: JobsService,
    private cdr: ChangeDetectorRef,
    private readonly _appService: AppService,

  ) {
    this.user = this._appService.user;
    this.skillSeekerId = this.user?.id as number;
    this.form = this.formBuilder.group({
      'jobtitle': ['', [Validators.required]],
      'location': ['', [Validators.required]],
      'technology': ['', [Validators.required]],
      'richText': ['', [Validators.required]],
      'skills': [null, [Validators.required]],
      'skillSet': ['', [Validators.required]],
      'department': ['', [Validators.required]],
      'project': ['', [Validators.required]],
      'experience': ['', [Validators.required]],
      '_level': ['', [Validators.required]],
      'level': ['', [Validators.required]],
      'remotePercent': ['', [Validators.required]],
      'counter': [''],
    });
  }
  ngOnInit(): void {
    this.getRetrieveJob();
    this.getTechnologyList();
    this.getDomainList();
    this.getSeekerProjectDetails();
    this.getOwnerSkillYearOfExperienceDetails();
    this.getHiringPriority();
    this.filteredOptions = this.locations.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    this.isLoading = true;
    this.jobsService.getLocation(value).subscribe((response) => {
      this.isLoading = false;
      this.addressData = response;
    });
    return this.addressData;
  }

  next(i: number): void {
    this.step = i;
  }

  getDomainList(): void {
    this.jobsService.getDomainList().subscribe((response) => {
      this.domainList = response;
    });
  }

  textChanged($event: any) {
    this.currentEditorTextLength = $event.editor.getLength() - 1;
    if ($event.editor.getLength() > this.maxEditorTextLength) {
      $event.editor.deleteText(this.maxEditorTextLength, $event.editor.getLength());
    }
  }

  getRetrieveJob() {
    this.seekersId = this.user.id as number;
    if (this.seekersId) {
      this.jobsService.getRetrieveJob(this.seekersId).subscribe((response) => {
        this.tabledata = response;
        this.tabledata.forEach((element) => {
          if (element['status'] === 'Active') element['status'] = 'New';
        });
        this.tabledata = this.tabledata.sort((a, b) => {
          return parseInt(a?.jobId?.slice(4)!) - parseInt(b?.jobId?.slice(4)!)
        });
        this.cdr.detectChanges();
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  get location() {
    return this.form.get('location');
  }

  get jobtitle() {
    return this.form.get('jobtitle');
  }

  get technology() {
    return this.form.get('technology');
  }

  get richText() {
    return this.form.get('richText');
  }

  get level() {
    return this.form.get('level');
  }

  get _level() {
    return this.form.get('_level');
  }

  get experience() {
    return this.form.get('experience');
  }

  get skillSet() {
    return this.form.get('skillSet');
  }

  get project() {
    return this.form.get('project');
  }

  get department() {
    return this.form.get('department');
  }

  setActive(buttonName: string) {
    this.role = buttonName;
    this.activeButton = buttonName;
    this.condition = true;
    console.log(this.id1)
  }

  firstSetActive(buttonName: string) {
    this.activeButtons = buttonName;

    for (let i = 0; i <= 11; i++) {
      if (buttonName === this.Experience[i]) {
        i += 1;
        this.id1 = i;
      }
    }

    this.condition = false;
  }

  secondSetActive(buttonName: string) {
    this.activeButtons = buttonName;
  }

  thirdSetActive(data: any) {
    this.condition1 = false;

    this.id3 = data.id;
    this.active = data.hiringPriority;
  }

  isActive(buttonName: string) {
    this.role = buttonName;
    return this.activeButton === buttonName;
  }

  isActiveFirst(buttonName: string) {
    return this.activeButtons === buttonName;
  }

  isActiveSecond(buttonName: string) {
    return this.active === buttonName;
  }

  isActiveThird(buttonName: string) {
    return this.active === buttonName;
  }

  listData(x: string) {
    this.selected = x;
  }

  getTechnologyList(): void {
    this.jobsService.getTechnologyList().subscribe((response) => {
      this.technologies = response;
    });
  }

  getSeekerProjectDetails(): void {
    this.jobsService.getSeekerProjectDetails(this.skillSeekerId).subscribe((response) => {
      this.projectName = response;
    });
  }

  getOwnerSkillYearOfExperienceDetails(): void {
    this.jobsService.getOwnerSkillYearOfExperienceDetails().subscribe((response) => {
      this.levelExperience = response;
      this.levels = this.levelExperience.map((x: any) => ({
        lvl: x[0],
        exp: x[1].split(','),
      }));
    });
  }

  addSkill(): void {
    const i = this.skills.findIndex(e => e === this.f?.skills?.value);
    if (i > -1) return this._appService.toastr('Value Already exist', { icon: 'warning' });
    this.skills.push(this.f?.skills?.value);
    const ii = this.technologies.findIndex(e => this.f?.skills?.value === e?.technologyValues) ?? -1;
    const m = this.technologies[ii] ?? null;
    this._skills.push({ id: ii > -1 ? m?.technologyId : null, label: this.f?.skills?.value });
    this.f?.skills?.setValue(null);
  }

  removeSkill(i: number): void {
    this.skills.splice(i, 1);
  }

  getHiringPriority() {
    this.jobsService.getHiringPriority().subscribe((response) => {
      this.hiringPriority = response;
    });
  }
}
