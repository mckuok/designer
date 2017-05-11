import {Component, OnInit} from "@angular/core";
import {FormGroup, FormArray, AbstractControl} from "@angular/forms";
import {GlobalCacheService} from "../global/global.cache.service";
import {BioFormFactory} from "./bio.form.factory";
import {BaseFormComponent} from "./bio.form.component";

@Component({
  moduleId: module.id,
  selector: 'work-form',
  templateUrl: 'bio.work.form.component.html',
  providers: [BioFormFactory]
})

export class WorkFormComponent extends BaseFormComponent implements OnInit {
  getMustHavePageIndex(): number {
    return -1;
  }

  getInitialItemCount(): number {
    return (<FormArray>(<FormGroup>this.bioForm).controls['work']).length;
  }

  getNeededPages(): number {
    return (<FormArray>(<FormGroup>this.bioForm).controls['work']).length;
  }

  getItemCountsPerPage(): number {
    return 1;
  }

  ngOnInit(): void {
    this.init();
  }

  buildForm(): AbstractControl {
    return new FormGroup({
      work: new FormArray([
        this.formBuilder.addItem('work')
      ])
    })
  }

  constructor(private formBuilder: BioFormFactory,
              private cacheService: GlobalCacheService) {
    super(formBuilder, cacheService, 'work');
  }

}
