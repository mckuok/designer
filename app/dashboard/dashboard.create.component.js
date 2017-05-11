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
var core_1 = require("@angular/core");
var github_api_service_1 = require("../github/github.api.service");
var global_cache_service_1 = require("../global/global.cache.service");
var router_1 = require("@angular/router");
var app_routing_config_1 = require("../app-routing.config");
var DashboardCreateTechfolioComponent = (function () {
    function DashboardCreateTechfolioComponent(gitHubApiService, cacheService, router) {
        this.gitHubApiService = gitHubApiService;
        this.cacheService = cacheService;
        this.router = router;
        this.progressMessages = [];
        this.hasPage = this.cacheService.hasPage;
        this.buttonText = 'Create New Techfolio';
        if (this.hasPage || this.isLocalRepoExisted()) {
            this.hasPage = true;
            this.progressMessages.push('We detected you have created your TechFolio, but GitHub has yet to reflect those changes. Please try again with Designer 5 minutes later to allow GitHub to pick up the changes');
            this.buttonText = 'Refresh';
        }
    }
    DashboardCreateTechfolioComponent.prototype.forkTechfolio = function () {
        var _this = this;
        this.progressMessages.push('Forking Techfolio template repository');
        if (!this.isLocalRepoExisted()) {
            this.gitHubApiService.forkTechfolio().subscribe(function (res) {
                _this.progressMessages.push('Finished forking Techfolio template repository');
                _this.configureTemplateReo(res.clone_url);
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.progressMessages.push('Finished forking Techfolio template repository');
            this.router.navigateByUrl(app_routing_config_1.INIT_CONFIG_LOADING);
        }
    };
    DashboardCreateTechfolioComponent.prototype.configureTemplateReo = function (url) {
        var _this = this;
        this.progressMessages.push('Updating template information with customized information');
        var updatedInfo = {
            name: this.cacheService.repoName,
            description: "Technical Portfolio https://" + this.cacheService.user.username + ".github.io/",
            homepage: "https://" + this.cacheService.user.username + ".github.io/"
        };
        this.gitHubApiService.editRepo(updatedInfo).subscribe(function (res) {
            _this.progressMessages.push('Finished updating template information with customized information');
            if (!_this.isLocalRepoExisted()) {
                _this.cloneToLocal(res.clone_url);
                _this.editConfigYml(res.name);
                _this.progressMessages.push('Pushing changes to remote repository');
                _this.gitHubApiService.pushChanges(res.name);
                _this.progressMessages.push('Finished pushing changes to remote repository');
            }
            _this.cacheService.hasPage = true;
            setTimeout(function () {
                _this.router.navigateByUrl(app_routing_config_1.INIT_CONFIG_LOADING);
            }, 5000);
        }, function (error) { return (console.log(error)); });
    };
    DashboardCreateTechfolioComponent.prototype.cloneToLocal = function (url) {
        this.progressMessages.push('Cloning remote repository into local machine');
        child_process.execSync("git clone " + url);
        this.progressMessages.push('Finished cloning remote repository into local machine');
    };
    DashboardCreateTechfolioComponent.prototype.editConfigYml = function (repoName) {
        this.progressMessages.push('Editing _config.yml to replace the default URL to your GitHub homepage URL');
        var configYml = repoName + "/_config.yml";
        var contents = fs.readFileSync(configYml, 'utf8').split('\n');
        var newContents = new Array(contents.length);
        for (var i = 0; i < contents.length; i += 1) {
            if (contents[i].startsWith('url')) {
                newContents[i] = "url: \"https://" + repoName + "\"";
            }
            else if (contents[i].startsWith('baseurl')) {
                newContents[i] = 'baseurl: ""';
            }
            else {
                newContents[i] = contents[i];
            }
        }
        fs.writeFileSync(configYml, newContents.join('\n'));
        this.progressMessages.push('Finished editing _config.yml');
    };
    DashboardCreateTechfolioComponent.prototype.isLocalRepoExisted = function () {
        return fs.existsSync(this.cacheService.repoDir);
    };
    DashboardCreateTechfolioComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard-create',
            templateUrl: 'dashboard.create.component.html',
            providers: [github_api_service_1.GitHubApiService]
        }), 
        __metadata('design:paramtypes', [github_api_service_1.GitHubApiService, global_cache_service_1.GlobalCacheService, router_1.Router])
    ], DashboardCreateTechfolioComponent);
    return DashboardCreateTechfolioComponent;
}());
exports.DashboardCreateTechfolioComponent = DashboardCreateTechfolioComponent;
//# sourceMappingURL=dashboard.create.component.js.map