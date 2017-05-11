"use strict";
var BaseFormComponent = (function () {
    function BaseFormComponent(_formBuilder, _cacheService, _category) {
        this._formBuilder = _formBuilder;
        this._cacheService = _cacheService;
        this._category = _category;
        this.shouldDisplay = [];
        this.pagination = [];
        this.bioFileLocation = this._cacheService.user.username + ".github.io/_data/bio.json";
        this.savedBio = this.loadBio();
    }
    BaseFormComponent.prototype.init = function () {
        this.bioForm = this.buildForm();
        this._formBuilder.expandForm(this.savedBio, this.bioForm, this._category);
        for (var i = 1; i < this.getNeededPages() + 1; i += 1) {
            this.pagination.push(i);
        }
        for (var i = 0; i < this.getInitialItemCount(); i += 1) {
            this.shouldDisplay.push(false);
        }
        this.selectPage(0);
    };
    BaseFormComponent.prototype.save = function (model) {
        console.log(model);
        this.savedBio[this._category] = model[this._category];
        fs.writeFileSync(this.bioFileLocation, JSON.stringify(this.savedBio));
    };
    BaseFormComponent.prototype.addEntry = function (array, key) {
        array.push(this._formBuilder.addItem(key));
        if (this.isNewPageNeeded()) {
            this.shouldDisplay.push(false);
            this.addPage();
            this.selectPage(this.pagination.length - 1);
        }
        else {
            this.shouldDisplay.push(true);
        }
    };
    BaseFormComponent.prototype.removeEntry = function (array, index) {
        array.removeAt(index);
        if (this.areTooManyPages()) {
            this.removePage();
        }
    };
    BaseFormComponent.prototype.areTooManyPages = function () {
        if (this.getNeededPages() < this.pagination.length) {
            return true;
        }
        else {
            return false;
        }
    };
    BaseFormComponent.prototype.isNewPageNeeded = function () {
        if (this.getNeededPages() > this.pagination.length) {
            return true;
        }
        else {
            return false;
        }
    };
    BaseFormComponent.prototype.addPage = function () {
        this.pagination.push(this.pagination.length + 1);
    };
    BaseFormComponent.prototype.removePage = function () {
        if (this.selectedPage > this.getMustHavePageIndex()) {
            if (this.pagination.length - 1 === this.selectedPage) {
                this.selectPage(this.selectedPage - 1);
            }
            this.pagination.splice(this.pagination.length - 1, 1);
        }
    };
    BaseFormComponent.prototype.selectPage = function (index) {
        for (var i = 0; i < this.shouldDisplay.length; i += 1) {
            this.shouldDisplay[i] = false;
        }
        var itemCount = this.getItemCountsPerPage();
        for (var i = 0; i < itemCount; i += 1) {
            if (this.shouldDisplay[index * itemCount + i] !== undefined) {
                this.shouldDisplay[index * itemCount + i] = true;
            }
            else {
                break;
            }
        }
        this.selectedPage = index;
    };
    BaseFormComponent.prototype.loadBio = function () {
        var content = fs.readFileSync(this.bioFileLocation);
        return JSON.parse(content);
    };
    return BaseFormComponent;
}());
exports.BaseFormComponent = BaseFormComponent;
//# sourceMappingURL=bio.form.component.js.map