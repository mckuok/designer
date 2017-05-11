import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {GitHubAuthComponent} from "./github/github-auth.component";
import {HttpModule} from "@angular/http";
import {DashboardLoadingComponent} from "./dashboard/dashboard.loading.component";
import {AppRoutingModule} from "./app-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {GlobalCacheService} from "./global/global.cache.service";
import {DashboardCreateTechfolioComponent} from "./dashboard/dashboard.create.component";
import {DashboardGetFormComponent} from "./dashboard/dashboard.getform.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BasicFormComponent} from "./bio/bio.basic.form.component";
import {InterestFormComponent} from "./bio/bio.interest.form.component";
import {SkillFormComponent} from "./bio/bio.skill.form.component";
import {EducationFormComponent} from "./bio/bio.education.form.component";
import {AwardFormComponent} from "./bio/bio.award.form.component";
import {ReferenceFormComponent} from "./bio/bio.reference.form.component";
import {VolunteerFormComponent} from "./bio/bio.volunteer.form.component";
import {WorkFormComponent} from "./bio/bio.work.form.component";
import {EssayComponent} from "./writing/essay.component";
import {ProjectComponent} from "./writing/project.component";
import {SanitizeHtml} from "./writing/sanitize.pipe";
import {SafePipe} from "./dashboard/safe.pipe";
import {WritingHomepageComponent} from "./writing/writing.homepage.component";

declare  var path: any;

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  AppRoutingModule,
                  ReactiveFormsModule
  ],
  declarations: [ AppComponent,
                  GitHubAuthComponent,
                  DashboardLoadingComponent,
                  DashboardComponent,
                  DashboardCreateTechfolioComponent,
                  DashboardGetFormComponent,
                  BasicFormComponent,
                  InterestFormComponent,
                  SkillFormComponent,
                  EducationFormComponent,
                  AwardFormComponent,
                  ReferenceFormComponent,
                  VolunteerFormComponent,
                  WorkFormComponent,
                  EssayComponent,
                  ProjectComponent,
                  SanitizeHtml,
                  SafePipe,
                  WritingHomepageComponent,
                  ],
  providers:    [GlobalCacheService],
  bootstrap:    [ AppComponent ]
})

export class AppModule {

  constructor(private cacheService: GlobalCacheService) {
    this.cacheService.root = path.normalize(`${__dirname}/../`);
  }
}
