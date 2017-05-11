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
var global_cache_service_1 = require("../global/global.cache.service");
var github_api_service_1 = require("../github/github.api.service");
var DashboardGetFormComponent = (function () {
    function DashboardGetFormComponent(cacheService, gitService) {
        this.cacheService = cacheService;
        this.gitService = gitService;
        var repoName = cacheService.user.username + ".github.io";
        this.liveUrl = "https://" + repoName;
        if (!fs.existsSync(path.join("" + this.cacheService.root, "" + repoName))) {
            var cloneUrl = "https://github.com/" + cacheService.user.username + "/" + repoName + ".git";
            child_process.execSync("git clone " + cloneUrl);
        }
        else {
            child_process.execSync("cd " + repoName + " && git pull origin master");
        }
        this.cacheService.repoName = repoName;
        this.cacheService.repoDir = path.normalize(this.cacheService.root + "/" + repoName);
        this.username = this.cacheService.user.username;
        this.avatar = this.cacheService.user.avatarUrl;
        var _a = electron.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
        this.windowHeight = height;
    }
    DashboardGetFormComponent.prototype.pushLive = function () {
        try {
            this.gitService.pushChanges(this.cacheService.repoName);
        }
        catch (ex) { }
    };
    DashboardGetFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard-getform',
            templateUrl: 'dashboard.getform.component.html',
            providers: [github_api_service_1.GitHubApiService]
        }), 
        __metadata('design:paramtypes', [global_cache_service_1.GlobalCacheService, github_api_service_1.GitHubApiService])
    ], DashboardGetFormComponent);
    return DashboardGetFormComponent;
}());
exports.DashboardGetFormComponent = DashboardGetFormComponent;
//# sourceMappingURL=dashboard.getform.component.js.map