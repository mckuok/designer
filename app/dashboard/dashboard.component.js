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
var dashboard_getform_component_1 = require("./dashboard.getform.component");
var dashboard_create_component_1 = require("./dashboard.create.component");
var DashboardComponent = (function () {
    function DashboardComponent(cacheService, componentFactoryResolver) {
        this.cacheService = cacheService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.username = '';
        this.hasPage = false;
        this.username = cacheService.user.username;
        this.hasPage = cacheService.hasPage;
    }
    DashboardComponent.prototype.ngAfterContentInit = function () {
        var childComponent;
        if (this.hasPage) {
            childComponent = this.componentFactoryResolver.resolveComponentFactory(dashboard_getform_component_1.DashboardGetFormComponent);
        }
        else {
            childComponent = this.componentFactoryResolver.resolveComponentFactory(dashboard_create_component_1.DashboardCreateTechfolioComponent);
        }
        this.content.createComponent(childComponent);
    };
    __decorate([
        core_1.ViewChild('content', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], DashboardComponent.prototype, "content", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            templateUrl: 'dashboard.component.html',
            entryComponents: [
                dashboard_getform_component_1.DashboardGetFormComponent,
                dashboard_create_component_1.DashboardCreateTechfolioComponent
            ]
        }), 
        __metadata('design:paramtypes', [global_cache_service_1.GlobalCacheService, core_1.ComponentFactoryResolver])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map