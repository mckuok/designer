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
var ProjectComponent = (function (_super) {
    __extends(ProjectComponent, _super);
    function ProjectComponent(cacheService) {
        _super.call(this, cacheService, path.join(cacheService.repoDir, 'projects'));
        this.cacheService = cacheService;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.init();
    };
    ProjectComponent.prototype.save = function (model) {
        var type = 'project';
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
        content += "image: " + this.getValueOrEmpty(model.image) + "\n";
        content += "title: \"" + this.getValueOrEmpty(model.title) + "\"\n";
        content += "permalink: " + this.getValueOrEmpty(model.permalink) + "\n";
        content += "date: " + this.getValueOrEmpty(model.date) + "\n";
        content += 'labels:\n';
        for (var i = 0; i < model.labels.length; i += 1) {
            content += "  - " + this.getValueOrEmpty(model.labels[i]) + "\n";
        }
        content += "summary: " + this.getValueOrEmpty(model.summary) + "\n";
        content += '---\n';
        content += this.getValueOrEmpty(model.content);
        fs.writeFileSync(writeTo, content);
        if (this.previousWritings.indexOf(fileTitle) === -1) {
            this.previousWritings.push(fileTitle);
        }
    };
    ProjectComponent.prototype.loadProject = function (index) {
        this.buildNewForm();
        var content = fs.readFileSync(path.join(this.writingDir, this.previousWritings[index]), 'utf8');
        var header = content.substring(3, content.substring(3).indexOf('---') + 3).trim();
        console.log(header);
        var headerKeys = header.split('\n');
        var image = this.getValueFromKeyPair(headerKeys[2], ':');
        var title = this.getValueFromKeyPair(headerKeys[3], ':');
        var permalink = this.getValueFromKeyPair(headerKeys[4], ':');
        var date = this.getValueFromKeyPair(headerKeys[5], ':');
        var labels = [];
        for (var i = 7; i < headerKeys.length - 1; i += 1) {
            labels.push(this.getValueFromKeyPair(headerKeys[i], '-'));
        }
        var summary = this.getValueFromKeyPair(headerKeys[headerKeys.length - 1], ':');
        var projectContent = content.substring(content.substring(3).indexOf('---') + 6).trim();
        this.writingForm.controls['title'].setValue(title);
        this.writingForm.controls['date'].setValue(date);
        var formLabels = this.writingForm.controls['labels'];
        for (var i = formLabels.controls.length; i < labels.length; i += 1) {
            this.addLabel();
        }
        for (var i = 0; i < labels.length; i += 1) {
            formLabels.at(i).setValue(labels[i]);
        }
        this.writingForm.controls['summary'].setValue(summary);
        this.writingForm.controls['content'].setValue(projectContent);
        this.overwriteFile = index;
    };
    ProjectComponent.prototype.buildNewForm = function () {
        var _this = this;
        this.writingForm = new forms_1.FormGroup({
            image: new forms_1.FormControl(),
            title: new forms_1.FormControl(),
            permalink: new forms_1.FormControl(),
            date: new forms_1.FormControl(),
            labels: new forms_1.FormArray([
                new forms_1.FormControl()
            ]),
            summary: new forms_1.FormControl(),
            content: new forms_1.FormControl()
        });
        this.writingForm.controls['content'].valueChanges.subscribe(function (data) {
            return _this.updatePreview(data);
        });
        this.preview = '';
        this.overwriteFile = -1;
    };
    ProjectComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project',
            templateUrl: 'project.component.html',
        }), 
        __metadata('design:paramtypes', [global_cache_service_1.GlobalCacheService])
    ], ProjectComponent);
    return ProjectComponent;
}(writing_component_1.WritingComponent));
exports.ProjectComponent = ProjectComponent;
//# sourceMappingURL=project.component.js.map