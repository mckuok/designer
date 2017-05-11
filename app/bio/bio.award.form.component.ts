import {Component, OnInit} from "@angular/core";
import {FormGroup, FormArray, AbstractControl} from "@angular/forms";
import {GlobalCacheService} from "../global/global.cache.service";
import {BioFormFactory} from "./bio.form.factory";
import {BaseFormComponent} from "./bio.form.component";

@Component({
  moduleId: module.id,
  selector: 'award-form',
  templateUrl: 'bio.award.form.component.html',
  providers: [BioFormFactory]
})

export class AwardFormComponent extends BaseFormComponent implements OnInit {
  getMustHavePageIndex(): number {
    return -1;
  }

  getInitialItemCount(): number {
    return (<FormArray>(<FormGroup>this.bioForm).controls['awards']).length;;
  }

  getNeededPages(): number {
    return Math.ceil((<FormArray>(<FormGroup>this.bioForm).controls['awards']).length
      / this.getItemCountsPerPage());
  }

  getItemCountsPerPage(): number {
    return 1;
  }

  ngOnInit(): void {
    this.init();
  }

  buildForm(): AbstractControl {
    return new FormGroup({
      awards: new FormArray([
        this.formBuilder.addItem('awards')
      ])
    })
  }

  constructor(private formBuilder: BioFormFactory,
              private cacheService: GlobalCacheService) {
    super(formBuilder, cacheService, 'awards');
  }

}
