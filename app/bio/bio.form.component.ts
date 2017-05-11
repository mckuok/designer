import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, FormControl, FormArray, AbstractControl} from "@angular/forms";
import {Bio} from "./bio.interface";
import {GlobalCacheService} from "../global/global.cache.service";
import {BioFormFactory} from "./bio.form.factory";

declare var fs: any;

export abstract class BaseFormComponent {
  bioForm: AbstractControl;
  shouldDisplay: boolean[] = [];
  pagination: number[] = [];
  selectedPage: number;

  private bioFileLocation: string;
  private savedBio: Object;


  constructor(private _formBuilder: BioFormFactory,
              private _cacheService: GlobalCacheService,
              private _category: string) {

    this.bioFileLocation = `${this._cacheService.user.username}.github.io/_data/bio.json`;
    this.savedBio = this.loadBio();
  }

  init() {
    this.bioForm = this.buildForm();
    this._formBuilder.expandForm(this.savedBio, this.bioForm, this._category);

    for (let i = 1; i < this.getNeededPages() + 1; i += 1) {
      this.pagination.push(i);
    }

    for (let i = 0; i < this.getInitialItemCount(); i += 1) {
      this.shouldDisplay.push(false);
    }
    this.selectPage(0);

  }

  abstract buildForm(): AbstractControl;
  abstract getNeededPages() : number;
  abstract getItemCountsPerPage(): number;
  abstract getInitialItemCount(): number;
  abstract getMustHavePageIndex(): number;

  save(model: Bio) {
    console.log(model);
    this.savedBio[this._category] = model[this._category];
    fs.writeFileSync(this.bioFileLocation, JSON.stringify(this.savedBio));
  }

  addEntry(array: FormArray, key: string) {
    array.push(this._formBuilder.addItem(key));
    if (this.isNewPageNeeded()) {
      this.shouldDisplay.push(false);
      this.addPage();

      this.selectPage(this.pagination.length - 1);
    } else {
      this.shouldDisplay.push(true);
    }
  }

  removeEntry(array: FormArray, index: number) {
    array.removeAt(index);
    if (this.areTooManyPages()) {
      this.removePage();
    }
  }

  areTooManyPages(): boolean {
    if (this.getNeededPages() < this.pagination.length) {
      return true;
    } else {
      return false;
    }
  }

  isNewPageNeeded(): boolean {
    if (this.getNeededPages() > this.pagination.length) {
      return true;
    } else {
      return false;
    }
  }

  addPage(): void {
    this.pagination.push(this.pagination.length + 1);
  }

  removePage(): void {
    if (this.selectedPage > this.getMustHavePageIndex()) {
      if (this.pagination.length - 1 === this.selectedPage) {
        this.selectPage(this.selectedPage - 1);
      }
      this.pagination.splice(this.pagination.length - 1, 1);
    }
  }

  selectPage(index: number) {
    for(let i = 0; i < this.shouldDisplay.length; i += 1) {
      this.shouldDisplay[i] = false;
    }

    const itemCount = this.getItemCountsPerPage();
    for (let i = 0; i < itemCount; i +=1 ) {
      if (this.shouldDisplay[index * itemCount + i] !== undefined) {
        this.shouldDisplay[index * itemCount + i] = true;
      } else {
        break;
      }
    }

    this.selectedPage = index;
  }


  private loadBio() {
    const content = fs.readFileSync(this.bioFileLocation);
    return JSON.parse(content);
  }


}
