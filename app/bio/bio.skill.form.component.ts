import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, FormArray, AbstractControl} from "@angular/forms";
import {GlobalCacheService} from "../global/global.cache.service";
import {BioFormFactory} from "./bio.form.factory";
import {BaseFormComponent} from "./bio.form.component";

@Component({
  moduleId: module.id,
  selector: 'skill-form',
  templateUrl: 'bio.skill.form.component.html',
  providers: [BioFormFactory]
})

export class SkillFormComponent extends BaseFormComponent implements OnInit {
  getMustHavePageIndex(): number {
    return -1;
  }

  getInitialItemCount(): number {
    return (<FormArray>((<FormGroup>this.bioForm).controls['skills'])).length;
  }

  getNeededPages(): number {
    return(<FormArray>(<FormGroup>this.bioForm).controls['skills']).length;
  }

  getItemCountsPerPage(): number {
    return 1;
  }


  ngOnInit(): void {
    this.init();
  }

  buildForm(): AbstractControl {
    return new FormGroup({
      skills: new FormArray([
        this.formBuilder.addItem('skills')
      ])
    })
  }

  constructor(private formBuilder: BioFormFactory,
              private cacheService: GlobalCacheService) {
    super(formBuilder, cacheService, 'skills');
  }

}
