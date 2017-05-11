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
var github_auth_service_1 = require("./github-auth.service");
var router_1 = require("@angular/router");
var app_routing_config_1 = require("../app-routing.config");
var GitHubAuthComponent = (function () {
    function GitHubAuthComponent(gitHubAuthService, router) {
        this.gitHubAuthService = gitHubAuthService;
        this.router = router;
        this.username = '';
        this.username = '';
    }
    GitHubAuthComponent.prototype.signIn = function () {
        var _this = this;
        var redirectToDashboard = function () {
            _this.router.navigateByUrl(app_routing_config_1.INIT_CONFIG_LOADING);
        };
        this.gitHubAuthService.authorize(redirectToDashboard);
    };
    GitHubAuthComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'github-auth-form',
            templateUrl: 'github-auth.component.html',
            providers: [github_auth_service_1.GitHubAuthService]
        }), 
        __metadata('design:paramtypes', [github_auth_service_1.GitHubAuthService, router_1.Router])
    ], GitHubAuthComponent);
    return GitHubAuthComponent;
}());
exports.GitHubAuthComponent = GitHubAuthComponent;
//# sourceMappingURL=github-auth.component.js.map