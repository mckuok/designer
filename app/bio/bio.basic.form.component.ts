import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, FormArray} from "@angular/forms";
import {GlobalCacheService} from "../global/global.cache.service";
import {BioFormFactory} from "./bio.form.factory";
import {BaseFormComponent} from "./bio.form.component";

@Component({
  moduleId: module.id,
  selector: 'basic-form',
  templateUrl: 'bio.basic.form.component.html',
  providers: [BioFormFactory]
})

export class BasicFormComponent extends BaseFormComponent implements OnInit {
  getMustHavePageIndex(): number {
    return 1;
  }

  getInitialItemCount(): number {
    return (<FormArray>((<FormGroup>((<FormGroup>this.bioForm).controls['basics'])).controls['profiles'])).length + 2;
  }

ngOnInit(): void {
    this.init();
  }

  buildForm(): FormGroup {
    return new FormGroup({
      basics: new FormGroup({
        name: new FormControl(''),
        label: new FormControl(''),
        picture: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        website: new FormControl(''),
        summary: new FormControl(''),
        location: new FormGroup({
          address: new FormControl(''),
          postalCode: new FormControl(''),
          city: new FormControl(''),
          countryCode: new FormControl(''),
          region: new FormControl(''),
        }),
        profiles: new FormArray([
          this.formBuilder.addItem('profiles')
        ])
      })
    });
  }

  constructor(private formBuilder: BioFormFactory,
              private cacheService: GlobalCacheService) {
    super(formBuilder, cacheService, 'basics');
  }

  getNeededPages() {
    let profileCount = (<FormArray>((<FormGroup>((<FormGroup>this.bioForm).controls['basics'])).controls['profiles'])).length;
    return Math.ceil(profileCount / 2) + 1;
  }

  getItemCountsPerPage(): number {
    return 2;
  }


}
