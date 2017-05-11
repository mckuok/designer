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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var github_auth_component_1 = require("./github/github-auth.component");
var http_1 = require("@angular/http");
var dashboard_loading_component_1 = require("./dashboard/dashboard.loading.component");
var app_routing_module_1 = require("./app-routing.module");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var global_cache_service_1 = require("./global/global.cache.service");
var dashboard_create_component_1 = require("./dashboard/dashboard.create.component");
var dashboard_getform_component_1 = require("./dashboard/dashboard.getform.component");
var forms_1 = require("@angular/forms");
var bio_basic_form_component_1 = require("./bio/bio.basic.form.component");
var bio_interest_form_component_1 = require("./bio/bio.interest.form.component");
var bio_skill_form_component_1 = require("./bio/bio.skill.form.component");
var bio_education_form_component_1 = require("./bio/bio.education.form.component");
var bio_award_form_component_1 = require("./bio/bio.award.form.component");
var bio_reference_form_component_1 = require("./bio/bio.reference.form.component");
var bio_volunteer_form_component_1 = require("./bio/bio.volunteer.form.component");
var bio_work_form_component_1 = require("./bio/bio.work.form.component");
var essay_component_1 = require("./writing/essay.component");
var project_component_1 = require("./writing/project.component");
var sanitize_pipe_1 = require("./writing/sanitize.pipe");
var safe_pipe_1 = require("./dashboard/safe.pipe");
var writing_homepage_component_1 = require("./writing/writing.homepage.component");
var AppModule = (function () {
    function AppModule(cacheService) {
        this.cacheService = cacheService;
        this.cacheService.root = path.normalize(__dirname + "/../");
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [app_component_1.AppComponent,
                github_auth_component_1.GitHubAuthComponent,
                dashboard_loading_component_1.DashboardLoadingComponent,
                dashboard_component_1.DashboardComponent,
                dashboard_create_component_1.DashboardCreateTechfolioComponent,
                dashboard_getform_component_1.DashboardGetFormComponent,
                bio_basic_form_component_1.BasicFormComponent,
                bio_interest_form_component_1.InterestFormComponent,
                bio_skill_form_component_1.SkillFormComponent,
                bio_education_form_component_1.EducationFormComponent,
                bio_award_form_component_1.AwardFormComponent,
                bio_reference_form_component_1.ReferenceFormComponent,
                bio_volunteer_form_component_1.VolunteerFormComponent,
                bio_work_form_component_1.WorkFormComponent,
                essay_component_1.EssayComponent,
                project_component_1.ProjectComponent,
                sanitize_pipe_1.SanitizeHtml,
                safe_pipe_1.SafePipe,
                writing_homepage_component_1.WritingHomepageComponent,
            ],
            providers: [global_cache_service_1.GlobalCacheService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [global_cache_service_1.GlobalCacheService])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map