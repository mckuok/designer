import {Component, OnInit} from "@angular/core";
import {FormArray, AbstractControl, FormGroup} from "@angular/forms";
import {GlobalCacheService} from "../global/global.cache.service";
import {BioFormFactory} from "./bio.form.factory";
import {BaseFormComponent} from "./bio.form.component";

@Component({
  moduleId: module.id,
  selector: 'education-form',
  templateUrl: 'bio.education.form.component.html',
  providers: [BioFormFactory]
})

export class EducationFormComponent extends BaseFormComponent implements OnInit {
  getMustHavePageIndex(): number {
    return -1;
  }

  getInitialItemCount(): number {
    return (<FormArray>(<FormGroup>this.bioForm).controls['education']).length;
  }

  getNeededPages(): number {
    return (<FormArray>(<FormGroup>this.bioForm).controls['education']).length;
  }

  getItemCountsPerPage(): number {
    return 1;
  }

  ngOnInit(): void {
    this.init();
  }

  buildForm(): AbstractControl {
    return new FormGroup({
      education: new FormArray([
        this.formBuilder.addItem('education')
      ])
    });
  }

  constructor(private formBuilder: BioFormFactory,
              private cacheService: GlobalCacheService) {
    super(formBuilder, cacheService, 'education');
  }

}
