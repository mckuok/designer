"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var dashboard_loading_component_1 = require("./dashboard/dashboard.loading.component");
var github_auth_component_1 = require("./github/github-auth.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var app_routing_config_1 = require("./app-routing.config");
var bio_basic_form_component_1 = require("./bio/bio.basic.form.component");
var bio_interest_form_component_1 = require("./bio/bio.interest.form.component");
var bio_reference_form_component_1 = require("./bio/bio.reference.form.component");
var bio_volunteer_form_component_1 = require("./bio/bio.volunteer.form.component");
var bio_work_form_component_1 = require("./bio/bio.work.form.component");
var bio_skill_form_component_1 = require("./bio/bio.skill.form.component");
var bio_education_form_component_1 = require("./bio/bio.education.form.component");
var bio_award_form_component_1 = require("./bio/bio.award.form.component");
var essay_component_1 = require("./writing/essay.component");
var writing_homepage_component_1 = require("./writing/writing.homepage.component");
var routes = [
    { path: app_routing_config_1.INIT_CONFIG_LOADING, component: dashboard_loading_component_1.DashboardLoadingComponent },
    { path: app_routing_config_1.GITHUB_AUTHORIZATION, component: github_auth_component_1.GitHubAuthComponent },
    { path: app_routing_config_1.DASHBOARD_HOME, component: dashboard_component_1.DashboardComponent,
        children: [
            { path: app_routing_config_1.BASIC_FORM, component: bio_basic_form_component_1.BasicFormComponent, outlet: 'dashboard' },
            { path: app_routing_config_1.INTEREST_FORM, component: bio_interest_form_component_1.InterestFormComponent, outlet: 'dashboard' },
            { path: app_routing_config_1.SKILL_FORM, component: bio_skill_form_component_1.SkillFormComponent, outlet: 'dashboard' },
            { path: app_routing_config_1.EDUCATION_FORM, component: bio_education_form_component_1.EducationFormComponent, outlet: 'dashboard' },
            { path: app_routing_config_1.WORK_FORM, component: bio_work_form_component_1.WorkFormComponent, outlet: 'dashboard' },
            { path: app_routing_config_1.VOLUNTEER_FORM, component: bio_volunteer_form_component_1.VolunteerFormComponent, outlet: 'dashboard' },
            { path: app_routing_config_1.AWARD_FORM, component: bio_award_form_component_1.AwardFormComponent, outlet: 'dashboard' },
            { path: app_routing_config_1.REFERENCE_FORM, component: bio_reference_form_component_1.ReferenceFormComponent, outlet: 'dashboard' },
            { path: app_routing_config_1.WRITING, component: writing_homepage_component_1.WritingHomepageComponent, outlet: 'dashboard',
                children: [
                    { path: app_routing_config_1.PROJECT, component: essay_component_1.EssayComponent, outlet: 'writing' },
                    { path: app_routing_config_1.ESSAY + "/:file", component: essay_component_1.EssayComponent, outlet: 'writing' },
                ] },
        ] },
    { path: '**', redirectTo: app_routing_config_1.INIT_CONFIG_LOADING },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map