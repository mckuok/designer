"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var forms_1 = require("@angular/forms");
var global_cache_service_1 = require("../global/global.cache.service");
var bio_form_factory_1 = require("./bio.form.factory");
var bio_form_component_1 = require("./bio.form.component");
var ReferenceFormComponent = (function (_super) {
    __extends(ReferenceFormComponent, _super);
    function ReferenceFormComponent(formBuilder, cacheService) {
        _super.call(this, formBuilder, cacheService, 'references');
        this.formBuilder = formBuilder;
        this.cacheService = cacheService;
    }
    ReferenceFormComponent.prototype.getMustHavePageIndex = function () {
        return -1;
    };
    ReferenceFormComponent.prototype.getInitialItemCount = function () {
        return this.bioForm.controls['references'].length;
        ;
    };
    ReferenceFormComponent.prototype.getNeededPages = function () {
        return Math.ceil(this.bioForm.controls['references'].length / this.getItemCountsPerPage());
    };
    ReferenceFormComponent.prototype.getItemCountsPerPage = function () {
        return 2;
    };
    ReferenceFormComponent.prototype.ngOnInit = function () {
        this.init();
    };
    ReferenceFormComponent.prototype.buildForm = function () {
        return new forms_1.FormGroup({
            references: new forms_1.FormArray([
                this.formBuilder.addItem('references')
            ])
        });
    };
    ReferenceFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'reference-form',
            templateUrl: 'bio.reference.form.component.html',
            providers: [bio_form_factory_1.BioFormFactory]
        }), 
        __metadata('design:paramtypes', [bio_form_factory_1.BioFormFactory, global_cache_service_1.GlobalCacheService])
    ], ReferenceFormComponent);
    return ReferenceFormComponent;
}(bio_form_component_1.BaseFormComponent));
exports.ReferenceFormComponent = ReferenceFormComponent;
//# sourceMappingURL=bio.reference.form.component.js.map