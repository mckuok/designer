import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardLoadingComponent} from "./dashboard/dashboard.loading.component";
import {GitHubAuthComponent} from "./github/github-auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {
  INIT_CONFIG_LOADING, GITHUB_AUTHORIZATION, DASHBOARD_HOME, BASIC_FORM, INTEREST_FORM, SKILL_FORM, REFERENCE_FORM,
  VOLUNTEER_FORM, WORK_FORM, EDUCATION_FORM, AWARD_FORM, WRITING, PROJECT, ESSAY
} from "./app-routing.config";
import {BasicFormComponent} from "./bio/bio.basic.form.component";
import {InterestFormComponent} from "./bio/bio.interest.form.component";
import {ReferenceFormComponent} from "./bio/bio.reference.form.component";
import {VolunteerFormComponent} from "./bio/bio.volunteer.form.component";
import {WorkFormComponent} from "./bio/bio.work.form.component";
import {SkillFormComponent} from "./bio/bio.skill.form.component";
import {EducationFormComponent} from "./bio/bio.education.form.component";
import {AwardFormComponent} from "./bio/bio.award.form.component";
import {EssayComponent} from "./writing/essay.component";
import {ProjectComponent} from "./writing/project.component";
import {WritingHomepageComponent} from "./writing/writing.homepage.component";

const routes: Routes = [
  { path: INIT_CONFIG_LOADING,    component: DashboardLoadingComponent},
  { path: GITHUB_AUTHORIZATION,  component: GitHubAuthComponent},
  { path: DASHBOARD_HOME,  component: DashboardComponent,
    children:[
      { path: BASIC_FORM, component: BasicFormComponent, outlet: 'dashboard' },
      { path: INTEREST_FORM, component: InterestFormComponent, outlet: 'dashboard'},
      { path: SKILL_FORM, component: SkillFormComponent, outlet: 'dashboard'},
      { path: EDUCATION_FORM, component: EducationFormComponent, outlet: 'dashboard'},
      { path: WORK_FORM, component: WorkFormComponent, outlet: 'dashboard'},
      { path: VOLUNTEER_FORM, component: VolunteerFormComponent, outlet: 'dashboard'},
      { path: AWARD_FORM, component: AwardFormComponent, outlet: 'dashboard'},
      { path: REFERENCE_FORM, component: ReferenceFormComponent, outlet: 'dashboard'},
      { path: WRITING, component: WritingHomepageComponent, outlet: 'dashboard',
        children:[
          { path: PROJECT, component: EssayComponent, outlet: 'writing'},
          { path: `${ESSAY}/:file`, component: EssayComponent, outlet: 'writing'},
        ]},
    ]},
  { path: '**', redirectTo: INIT_CONFIG_LOADING},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
