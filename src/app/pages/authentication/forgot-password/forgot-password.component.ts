import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, first } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  email!: AbstractControl;
  status: string = 'password';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        filter(e => !!e && !!e?.['type']),
        first()
      ).subscribe((params: Params) => this.status = params['type']);

    this.form = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
    this.email = this.form.controls['email'];
  }

  submit(): void {
    if (!this.form.valid) return;
    console.log(this.form.value)
  }
}
