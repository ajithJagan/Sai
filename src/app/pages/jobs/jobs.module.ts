import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { routing } from './jobs.routing';
import { SeekerComponent } from './feature/seeker/seeker.component';
import { BuzzComponent } from './feature/buzz/buzz.component';
import { SharedModule } from '../shared';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    JobsComponent,
    SeekerComponent,
    BuzzComponent,
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    CoreModule,
    QuillModule.forRoot({
      customOptions: [
        { import: 'formats/font', whitelist: ['roboto', 'serif', 'sanserif', 'monospace'] }
      ]
    })
  ]
})
export class JobsModule { }
