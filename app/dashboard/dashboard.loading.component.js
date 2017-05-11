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
var github_auth_service_1 = require("../github/github-auth.service");
var global_cache_service_1 = require("../global/global.cache.service");
var router_1 = require("@angular/router");
var app_routing_config_1 = require("../app-routing.config");
var DashboardLoadingComponent = (function () {
    function DashboardLoadingComponent(gitHubAuthService, persistenceService, router) {
        this.gitHubAuthService = gitHubAuthService;
        this.persistenceService = persistenceService;
        this.router = router;
        this.loadingMessage = 'Loading application configuration ...';
    }
    DashboardLoadingComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        var observable = this.gitHubAuthService.checkAccessToken();
        if (observable) {
            observable.subscribe(function (returnedUser) {
                if (returnedUser) {
                    _this.persistenceService.user = returnedUser;
                    _this.gitHubAuthService.verifyUsername(_this.persistenceService.user.username)
                        .subscribe(function (result) {
                        console.log(result);
                        if (result < 400) {
                            _this.persistenceService.hasPage = true;
                        }
                        else {
                            _this.persistenceService.hasPage = false;
                        }
                        _this.router.navigateByUrl(app_routing_config_1.DASHBOARD_HOME);
                        return;
                    }, function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != '' || !_this.errorMessage) {
                            _this.persistenceService.hasPage = false;
                        }
                        _this.router.navigateByUrl(app_routing_config_1.DASHBOARD_HOME);
                        return;
                    });
                }
                else {
                    _this.router.navigateByUrl(app_routing_config_1.GITHUB_AUTHORIZATION);
                    return;
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != '' || !_this.errorMessage) {
                    _this.router.navigateByUrl(app_routing_config_1.GITHUB_AUTHORIZATION);
                    return;
                }
            });
        }
        else {
            this.router.navigateByUrl(app_routing_config_1.GITHUB_AUTHORIZATION);
            return;
        }
    };
    DashboardLoadingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard-loading',
            templateUrl: 'dashboard.loading.component.html',
            providers: [github_auth_service_1.GitHubAuthService]
        }), 
        __metadata('design:paramtypes', [github_auth_service_1.GitHubAuthService, global_cache_service_1.GlobalCacheService, router_1.Router])
    ], DashboardLoadingComponent);
    return DashboardLoadingComponent;
}());
exports.DashboardLoadingComponent = DashboardLoadingComponent;
//# sourceMappingURL=dashboard.loading.component.js.map