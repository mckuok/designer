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
var BasicFormComponent = (function (_super) {
    __extends(BasicFormComponent, _super);
    function BasicFormComponent(formBuilder, cacheService) {
        _super.call(this, formBuilder, cacheService, 'basics');
        this.formBuilder = formBuilder;
        this.cacheService = cacheService;
    }
    BasicFormComponent.prototype.getMustHavePageIndex = function () {
        return 1;
    };
    BasicFormComponent.prototype.getInitialItemCount = function () {
        return ((this.bioForm.controls['basics']).controls['profiles']).length + 2;
    };
    BasicFormComponent.prototype.ngOnInit = function () {
        this.init();
    };
    BasicFormComponent.prototype.buildForm = function () {
        return new forms_1.FormGroup({
            basics: new forms_1.FormGroup({
                name: new forms_1.FormControl(''),
                label: new forms_1.FormControl(''),
                picture: new forms_1.FormControl(''),
                email: new forms_1.FormControl(''),
                phone: new forms_1.FormControl(''),
                website: new forms_1.FormControl(''),
                summary: new forms_1.FormControl(''),
                location: new forms_1.FormGroup({
                    address: new forms_1.FormControl(''),
                    postalCode: new forms_1.FormControl(''),
                    city: new forms_1.FormControl(''),
                    countryCode: new forms_1.FormControl(''),
                    region: new forms_1.FormControl(''),
                }),
                profiles: new forms_1.FormArray([
                    this.formBuilder.addItem('profiles')
                ])
            })
        });
    };
    BasicFormComponent.prototype.getNeededPages = function () {
        var profileCount = ((this.bioForm.controls['basics']).controls['profiles']).length;
        return Math.ceil(profileCount / 2) + 1;
    };
    BasicFormComponent.prototype.getItemCountsPerPage = function () {
        return 2;
    };
    BasicFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'basic-form',
            templateUrl: 'bio.basic.form.component.html',
            providers: [bio_form_factory_1.BioFormFactory]
        }), 
        __metadata('design:paramtypes', [bio_form_factory_1.BioFormFactory, global_cache_service_1.GlobalCacheService])
    ], BasicFormComponent);
    return BasicFormComponent;
}(bio_form_component_1.BaseFormComponent));
exports.BasicFormComponent = BasicFormComponent;
//# sourceMappingURL=bio.basic.form.component.js.map