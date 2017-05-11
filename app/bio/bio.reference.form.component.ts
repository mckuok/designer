import {Component, OnInit} from "@angular/core";
import {FormGroup, FormArray, AbstractControl} from "@angular/forms";
import {GlobalCacheService} from "../global/global.cache.service";
import {BioFormFactory} from "./bio.form.factory";
import {BaseFormComponent} from "./bio.form.component";

@Component({
  moduleId: module.id,
  selector: 'reference-form',
  templateUrl: 'bio.reference.form.component.html',
  providers: [BioFormFactory]
})

export class ReferenceFormComponent extends BaseFormComponent implements OnInit {
  getMustHavePageIndex(): number {
    return -1;
  }
  getInitialItemCount(): number {
    return (<FormArray>(<FormGroup>this.bioForm).controls['references']).length;;
  }

  getNeededPages(): number {
    return Math.ceil((<FormArray>(<FormGroup>this.bioForm).controls['references']).length / this.getItemCountsPerPage());
  }

  getItemCountsPerPage(): number {
    return 2;
  }

  ngOnInit(): void {
    this.init();
  }

  buildForm(): AbstractControl {
    return new FormGroup({
      references: new FormArray([
        this.formBuilder.addItem('references')
      ])
    })
  }

  constructor(private formBuilder: BioFormFactory,
              private cacheService: GlobalCacheService) {
    super(formBuilder, cacheService, 'references');
  }

}
