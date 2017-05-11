"use strict";
var forms_1 = require("@angular/forms");
var WritingComponent = (function () {
    function WritingComponent(_cacheService, writingDir) {
        this._cacheService = _cacheService;
        this.writingDir = writingDir;
        this.previousWritings = [];
        this.fileUploadStatus = '';
    }
    WritingComponent.prototype.init = function () {
        this.buildNewForm();
        this.previousWritings = [];
        var files = fs.readdirSync(this.writingDir);
        for (var i = 0; i < files.length; i += 1) {
            if (files[i].endsWith('md')) {
                this.previousWritings.push(files[i]);
            }
        }
    };
    WritingComponent.prototype.updatePreview = function (data) {
        //const repoDir = `${this._cacheService.root.replace(/\\/g,'/')}${this._cacheService.user.username}.github.io`;
        var repoDir = this._cacheService.repoDir.replace(/\\/g, '/');
        data = data.replace(/["]..\//g, "\"" + repoDir + "/")
            .replace(/[']..\//g, "\"" + repoDir + "/")
            .replace(/[{][{] site.baseurl [}][}]/g, repoDir)
            .replace(/[{][{]site.baseurl[}][}]/g, repoDir);
        this.preview = marked(data);
    };
    WritingComponent.prototype.deleteWriting = function (index) {
        fs.unlinkSync(path.join(this.writingDir, this.previousWritings[index]));
        this.previousWritings.splice(index, 1);
    };
    WritingComponent.prototype.addLabel = function () {
        var formLabels = this.writingForm.controls['labels'];
        formLabels.push(new forms_1.FormControl());
    };
    WritingComponent.prototype.removeLabel = function (index) {
        var formLabels = this.writingForm.controls['labels'];
        formLabels.removeAt(index);
    };
    WritingComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        if (fileInput.target.files) {
            var _loop_1 = function(i) {
                if (fileInput.target.files[i]) {
                    this_1.fileUploadStatus = 'Uploading ... ';
                    fs.readFile(fileInput.target.files[i].path, function (err, data) {
                        var imageDir = path.join(_this._cacheService.repoDir, 'images');
                        var imageFilePath = path.join(imageDir, path.basename(fileInput.target.files[i].path));
                        fs.writeFile(imageFilePath, data, function () {
                            _this.fileUploadStatus = 'Done. File(s) are now in images folder';
                        });
                    });
                }
            };
            var this_1 = this;
            for (var i = 0; i < fileInput.target.files.length; i += 1) {
                _loop_1(i);
            }
        }
    };
    WritingComponent.prototype.getValueOrEmpty = function (str) {
        if (str === null) {
            return '';
        }
        return str;
    };
    WritingComponent.prototype.getValueFromKeyPair = function (str, seperator) {
        return str.substring(str.indexOf(seperator) + 1).trim();
    };
    return WritingComponent;
}());
exports.WritingComponent = WritingComponent;
//# sourceMappingURL=writing.component.js.map