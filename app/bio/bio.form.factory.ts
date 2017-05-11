import {Injectable} from "@angular/core";
import {FormControl, FormGroup, FormArray, AbstractControl} from "@angular/forms";

@Injectable()

export class BioFormFactory {

  constructor() {}

  addItem(key: string): AbstractControl {
    switch (key) {
      case 'profiles':
        return this.addProfiles();
      case 'interests':
        return this.addInterest();
      case 'skills':
        return this.addSkills();
      case 'education':
        return this.addEducation();
      case 'work':
        return this.addWork();
      case 'volunteer':
        return this.addVolunteer();
      case 'awards':
        return this.addAwards();
      case 'references':
        return this.addReference();
      default:
        return new FormControl('');
    }
  }

  expandForm(bio: Object, form: AbstractControl, category: string) {
    if (Array.isArray(bio[category])) {
      let formArray = (<FormArray> form).controls[category];
      for (let i = formArray.length; i < bio[category].length; i+=1) {
        formArray.push(this.addItem(category));
      }
      for (let i = 0; i < bio[category].length; i += 1) {
        this.expandFormGroupToFit(bio[category][i], <FormGroup>(formArray.at(i)));
      }
    } else {
      this.expandFormGroupToFit(bio[category], <FormGroup>(<FormGroup>form).controls[category]);
    }

  }

  private expandFormGroupToFit(savedBio: Object, form: FormGroup) {
    for (let key in savedBio) {
      if (savedBio.hasOwnProperty(key)) {
        if (Array.isArray(savedBio[key])) {
          let innerFormArray = <FormArray>(form.controls[key]);
          for (let j = innerFormArray.controls.length; j < savedBio[key].length; j+=1) {
            if (key === 'profiles') {
              innerFormArray.push(this.addItem('profiles'));
            } else {
              innerFormArray.push(new FormControl(''));
            }
          }

          for (let j = 0; j < savedBio[key].length; j+=1) {
            innerFormArray.at(j).setValue(savedBio[key][j]);
          }
        } else {
          form.controls[key].setValue(savedBio[key]);
        }
      }
    }
  }


  private addProfiles() {
    return new FormGroup({
      network: new FormControl(''),
      username: new FormControl(''),
      url: new FormControl(''),
    })
  }

  private addInterest() {
    return new FormGroup({
      name: new FormControl(''),
      keywords: new FormArray([
        new FormControl('')
      ])
    });
  }

  private addSkills() {
    return new FormGroup({
      name: new FormControl(''),
      level: new FormControl(''),
      keywords: new FormArray([
        new FormControl('')
      ])
    })
  }

  private addEducation() {
    return new FormGroup({
      institution: new FormControl(''),
      area: new FormControl(''),
      studyType: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      gpa: new FormControl(''),
      courses: new FormArray([
        new FormControl('')
      ])
    })
  }

  private addWork() {
    return new FormGroup({
      company: new FormControl(''),
      position: new FormControl(''),
      website: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      summary: new FormControl(''),
      highlights: new FormArray([
        new FormControl('')
      ])
    })
  }

  private addVolunteer() {
    return new FormGroup({
      organization: new FormControl(''),
      website: new FormControl(''),
      position: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      summary: new FormControl(''),
      highlights: new FormArray([
        new FormControl('')
      ])
    })
  }

  private addAwards() {
    return new FormGroup({
      title: new FormControl(''),
      date: new FormControl(''),
      awarder: new FormControl(''),
      summary: new FormControl(''),
    });
  }

  private addReference() {
    return new FormGroup({
      name: new FormControl(''),
      reference: new FormControl('')
    })
  }



}
