import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, FormArray, AbstractControl} from "@angular/forms";
import {GlobalCacheService} from "../global/global.cache.service";
import {BioFormFactory} from "./bio.form.factory";
import {BaseFormComponent} from "./bio.form.component";

@Component({
  moduleId: module.id,
  selector: 'interest-form',
  templateUrl: 'bio.interest.form.component.html',
  providers: [BioFormFactory]
})

export class InterestFormComponent extends BaseFormComponent implements OnInit {
  getMustHavePageIndex(): number {
    return -1;
  }

  getInitialItemCount(): number {
    return (<FormArray>((<FormGroup>this.bioForm).controls['interests'])).length;
  }


  getNeededPages(): number {
    return(<FormArray>(<FormGroup>this.bioForm).controls['interests']).length;
  }

  getItemCountsPerPage(): number {
    return 1;
  }

  ngOnInit(): void {
    this.init();
  }

  buildForm(): AbstractControl {
    return new FormGroup({
      interests: new FormArray([
        this.formBuilder.addItem('interests')
      ])
    })
  }

  constructor(private formBuilder: BioFormFactory,
              private cacheService: GlobalCacheService) {
    super(formBuilder, cacheService, 'interests');
  }

}
