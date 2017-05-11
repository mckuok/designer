import {FormGroup, FormControl, FormArray} from "@angular/forms";
import {GlobalCacheService} from "../global/global.cache.service";

declare var marked: any;
declare var path: any;
declare var fs: any;

export abstract class WritingComponent {

  writingForm: FormGroup;
  preview: string;
  previousWritings: string[] = [];
  fileUploadStatus: string = '';

  constructor(private _cacheService: GlobalCacheService, protected writingDir: string){}

  protected init(): void {
    this.buildNewForm();

    this.previousWritings = [];
    let files = fs.readdirSync(this.writingDir);
    for (let i = 0; i < files.length; i += 1) {
      if (files[i].endsWith('md')) {
        this.previousWritings.push(files[i]);
      }
    }
  }

  protected updatePreview(data: string) {
    //const repoDir = `${this._cacheService.root.replace(/\\/g,'/')}${this._cacheService.user.username}.github.io`;
    const repoDir = this._cacheService.repoDir.replace(/\\/g,'/');
    data = data.replace(/["]..\//g, `"${repoDir}/`)
      .replace(/[']..\//g, `"${repoDir}/`)
      .replace(/[{][{] site.baseurl [}][}]/g, repoDir)
      .replace(/[{][{]site.baseurl[}][}]/g, repoDir);
    this.preview = marked(data);
  }

  deleteWriting(index: number) {
    fs.unlinkSync(path.join(this.writingDir, this.previousWritings[index]));
    this.previousWritings.splice(index, 1);
  }

  addLabel() {
    let formLabels = (<FormArray>this.writingForm.controls['labels']);
    formLabels.push(new FormControl());
  }

  removeLabel(index: number) {
    let formLabels = (<FormArray>this.writingForm.controls['labels']);
    formLabels.removeAt(index);
  }

  fileChangeEvent(fileInput:any) {
    if (fileInput.target.files) {
      for (let i = 0; i < fileInput.target.files.length; i += 1) {
        if (fileInput.target.files[i]) {
          this.fileUploadStatus = 'Uploading ... ';
          fs.readFile(fileInput.target.files[i].path, (err: any, data: any) => {
            const imageDir = path.join(this._cacheService.repoDir, 'images');
            const imageFilePath = path.join(imageDir, path.basename(fileInput.target.files[i].path));
            fs.writeFile(imageFilePath, data, () => {
              this.fileUploadStatus = 'Done. File(s) are now in images folder';
            });
          });
        }
      }
    }
  }

  protected getValueOrEmpty(str: string) {
    if (str === null) {
      return '';
    }
    return str;
  }

  protected getValueFromKeyPair(str: string, seperator: string) {
    return str.substring(str.indexOf(seperator) + 1).trim();
  }

  abstract buildNewForm(): void;

}
