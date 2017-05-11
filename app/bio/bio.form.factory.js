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
var forms_1 = require("@angular/forms");
var BioFormFactory = (function () {
    function BioFormFactory() {
    }
    BioFormFactory.prototype.addItem = function (key) {
        switch (key) {
            case 'profiles':
                return this.addProfiles();
            case 'interests':
                return this.addInterest();
            case 'skills':
                return this.addSkills();
            case 'education':
                return this.addEducation();
            case 'work':
                return this.addWork();
            case 'volunteer':
                return this.addVolunteer();
            case 'awards':
                return this.addAwards();
            case 'references':
                return this.addReference();
            default:
                return new forms_1.FormControl('');
        }
    };
    BioFormFactory.prototype.expandForm = function (bio, form, category) {
        if (Array.isArray(bio[category])) {
            var formArray = form.controls[category];
            for (var i = formArray.length; i < bio[category].length; i += 1) {
                formArray.push(this.addItem(category));
            }
            for (var i = 0; i < bio[category].length; i += 1) {
                this.expandFormGroupToFit(bio[category][i], (formArray.at(i)));
            }
        }
        else {
            this.expandFormGroupToFit(bio[category], form.controls[category]);
        }
    };
    BioFormFactory.prototype.expandFormGroupToFit = function (savedBio, form) {
        for (var key in savedBio) {
            if (savedBio.hasOwnProperty(key)) {
                if (Array.isArray(savedBio[key])) {
                    var innerFormArray = (form.controls[key]);
                    for (var j = innerFormArray.controls.length; j < savedBio[key].length; j += 1) {
                        if (key === 'profiles') {
                            innerFormArray.push(this.addItem('profiles'));
                        }
                        else {
                            innerFormArray.push(new forms_1.FormControl(''));
                        }
                    }
                    for (var j = 0; j < savedBio[key].length; j += 1) {
                        innerFormArray.at(j).setValue(savedBio[key][j]);
                    }
                }
                else {
                    form.controls[key].setValue(savedBio[key]);
                }
            }
        }
    };
    BioFormFactory.prototype.addProfiles = function () {
        return new forms_1.FormGroup({
            network: new forms_1.FormControl(''),
            username: new forms_1.FormControl(''),
            url: new forms_1.FormControl(''),
        });
    };
    BioFormFactory.prototype.addInterest = function () {
        return new forms_1.FormGroup({
            name: new forms_1.FormControl(''),
            keywords: new forms_1.FormArray([
                new forms_1.FormControl('')
            ])
        });
    };
    BioFormFactory.prototype.addSkills = function () {
        return new forms_1.FormGroup({
            name: new forms_1.FormControl(''),
            level: new forms_1.FormControl(''),
            keywords: new forms_1.FormArray([
                new forms_1.FormControl('')
            ])
        });
    };
    BioFormFactory.prototype.addEducation = function () {
        return new forms_1.FormGroup({
            institution: new forms_1.FormControl(''),
            area: new forms_1.FormControl(''),
            studyType: new forms_1.FormControl(''),
            startDate: new forms_1.FormControl(''),
            endDate: new forms_1.FormControl(''),
            gpa: new forms_1.FormControl(''),
            courses: new forms_1.FormArray([
                new forms_1.FormControl('')
            ])
        });
    };
    BioFormFactory.prototype.addWork = function () {
        return new forms_1.FormGroup({
            company: new forms_1.FormControl(''),
            position: new forms_1.FormControl(''),
            website: new forms_1.FormControl(''),
            startDate: new forms_1.FormControl(''),
            endDate: new forms_1.FormControl(''),
            summary: new forms_1.FormControl(''),
            highlights: new forms_1.FormArray([
                new forms_1.FormControl('')
            ])
        });
    };
    BioFormFactory.prototype.addVolunteer = function () {
        return new forms_1.FormGroup({
            organization: new forms_1.FormControl(''),
            website: new forms_1.FormControl(''),
            position: new forms_1.FormControl(''),
            startDate: new forms_1.FormControl(''),
            endDate: new forms_1.FormControl(''),
            summary: new forms_1.FormControl(''),
            highlights: new forms_1.FormArray([
                new forms_1.FormControl('')
            ])
        });
    };
    BioFormFactory.prototype.addAwards = function () {
        return new forms_1.FormGroup({
            title: new forms_1.FormControl(''),
            date: new forms_1.FormControl(''),
            awarder: new forms_1.FormControl(''),
            summary: new forms_1.FormControl(''),
        });
    };
    BioFormFactory.prototype.addReference = function () {
        return new forms_1.FormGroup({
            name: new forms_1.FormControl(''),
            reference: new forms_1.FormControl('')
        });
    };
    BioFormFactory = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BioFormFactory);
    return BioFormFactory;
}());
exports.BioFormFactory = BioFormFactory;
//# sourceMappingURL=bio.form.factory.js.map