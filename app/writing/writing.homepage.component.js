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
var router_1 = require("@angular/router");
var WritingHomepageComponent = (function () {
    function WritingHomepageComponent(cacheService, router) {
        this.cacheService = cacheService;
        this.router = router;
        this.essays = [];
        this.projects = [];
        this.images = [];
        this.repoName = this.cacheService.repoName;
    }
    WritingHomepageComponent.prototype.ngOnInit = function () {
        this.readFolder('essays', this.essays, 'md');
        this.readFolder('projects', this.projects, 'md');
        this.readFolder('images', this.images);
    };
    WritingHomepageComponent.prototype.openModal = function (type, file) {
        console.log(type);
        console.log(file);
        this.router.navigate([("dashboard/(dashboard:dashboard/writing/(writing:dashboard/writing/" + type + "))")], { queryParams: { file: file } })
            .then(function () {
            _$('.ui.modal').modal('refresh');
            _$('.ui.modal')
                .modal('show');
        });
    };
    WritingHomepageComponent.prototype.readFolder = function (dirName, fileArray, extension) {
        var files = fs.readdirSync(path.join(this.cacheService.repoDir, dirName));
        for (var i = 0; i < files.length; i += 1) {
            if (extension != null) {
                if (files[i].endsWith(extension)) {
                    fileArray.push(files[i]);
                }
            }
            else {
                fileArray.push(files[i]);
            }
        }
    };
    WritingHomepageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'writing.homepage.component.html',
        }), 
        __metadata('design:paramtypes', [global_cache_service_1.GlobalCacheService, router_1.Router])
    ], WritingHomepageComponent);
    return WritingHomepageComponent;
}());
exports.WritingHomepageComponent = WritingHomepageComponent;
//# sourceMappingURL=writing.homepage.component.js.map