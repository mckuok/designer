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
var writing_component_1 = require("./writing.component");
var router_1 = require("@angular/router");
var EssayComponent = (function (_super) {
    __extends(EssayComponent, _super);
    function EssayComponent(cacheService, activatedRoute) {
        _super.call(this, cacheService, path.join(cacheService.repoDir, 'essays'));
        this.cacheService = cacheService;
        this.activatedRoute = activatedRoute;
    }
    EssayComponent.prototype.ngOnInit = function () {
        this.init();
        this.activatedRoute.params.subscribe(function (params) {
            var userId = params['file'];
            console.log(userId);
        });
    };
    EssayComponent.prototype.save = function (model) {
        var type = 'essay';
        var fileTitle = '';
        if (this.overwriteFile === -1) {
            fileTitle = this.getValueOrEmpty(model.title).replace(/ /g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") + ".md";
        }
        else {
            fileTitle = this.previousWritings[this.overwriteFile];
        }
        var writeTo = path.join(this.writingDir, fileTitle);
        var content = '';
        content += '---\n';
        content += "layout: " + type + "\n";
        content += "type: " + type + "\n";
        content += "title: \"" + this.getValueOrEmpty(model.title) + "\"\n";
        content += "date: " + this.getValueOrEmpty(model.date) + "\n";
        content += 'labels:\n';
        console.log(model.labels);
        for (var i = 0; i < model.labels.length; i += 1) {
            content += "  - " + this.getValueOrEmpty(model.labels[i]) + "\n";
        }
        content += '---\n';
        content += this.getValueOrEmpty(model.content);
        fs.writeFileSync(writeTo, content);
        if (this.previousWritings.indexOf(fileTitle) === -1) {
            this.previousWritings.push(fileTitle);
        }
    };
    EssayComponent.prototype.loadEssay = function (index) {
        this.buildNewForm();
        var content = fs.readFileSync(path.join(this.writingDir, this.previousWritings[index]), 'utf8');
        var header = content.substring(3, content.substring(3).indexOf('---') + 3).trim();
        console.log(header);
        var headerKeys = header.split('\n');
        var title = this.getValueFromKeyPair(headerKeys[2], ':');
        var date = this.getValueFromKeyPair(headerKeys[3], ':');
        var labels = [];
        for (var i = 5; i < headerKeys.length; i += 1) {
            labels.push(this.getValueFromKeyPair(headerKeys[i], '-'));
        }
        var essayContent = content.substring(content.substring(3).indexOf('---') + 6).trim();
        this.writingForm.controls['title'].setValue(title);
        this.writingForm.controls['date'].setValue(date);
        var formLabels = this.writingForm.controls['labels'];
        for (var i = formLabels.controls.length; i < labels.length; i += 1) {
            this.addLabel();
        }
        for (var i = 0; i < labels.length; i += 1) {
            formLabels.at(i).setValue(labels[i]);
        }
        this.writingForm.controls['content'].setValue(essayContent);
        this.overwriteFile = index;
    };
    EssayComponent.prototype.buildNewForm = function () {
        var _this = this;
        this.writingForm = new forms_1.FormGroup({
            title: new forms_1.FormControl(),
            date: new forms_1.FormControl(),
            labels: new forms_1.FormArray([
                new forms_1.FormControl()
            ]),
            content: new forms_1.FormControl()
        });
        this.writingForm.controls['content'].valueChanges.subscribe(function (data) {
            return _this.updatePreview(data);
        });
        this.preview = '';
        this.overwriteFile = -1;
    };
    EssayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'essay',
            templateUrl: 'essay.component.html'
        }), 
        __metadata('design:paramtypes', [global_cache_service_1.GlobalCacheService, router_1.ActivatedRoute])
    ], EssayComponent);
    return EssayComponent;
}(writing_component_1.WritingComponent));
exports.EssayComponent = EssayComponent;
//# sourceMappingURL=essay.component.js.map