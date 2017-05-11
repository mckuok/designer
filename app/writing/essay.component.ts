import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, FormArray} from "@angular/forms";
import {GlobalCacheService} from "../global/global.cache.service";
import {Essay} from "./essay.interface";
import {WritingComponent} from "./writing.component";
import {ActivatedRoute, Params} from "@angular/router";

declare var path: any;
declare var fs: any;

@Component({
  moduleId: module.id,
  selector: 'essay',
  templateUrl: 'essay.component.html'
})

export class EssayComponent extends WritingComponent implements OnInit {

  private overwriteFile: number;

  constructor(private cacheService: GlobalCacheService, private activatedRoute: ActivatedRoute){
    super(cacheService, path.join(cacheService.repoDir, 'essays'));
  }


  ngOnInit(): void {
    this.init();

    this.activatedRoute.params.subscribe((params: Params) => {
      let userId = params['file'];
      console.log(userId);
    });
  }

  save(model: Essay) {
    const type = 'essay';
    let fileTitle = '';
    if (this.overwriteFile === -1) {
      fileTitle = `${this.getValueOrEmpty(model.title).replace(/ /g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")}.md`;
    } else {
      fileTitle = this.previousWritings[this.overwriteFile];
    }
    const writeTo = path.join(this.writingDir, fileTitle);

    let content: string = '';
    content += '---\n';
    content += `layout: ${type}\n`;
    content += `type: ${type}\n`;
    content += `title: "${this.getValueOrEmpty(model.title)}"\n`;
    content += `date: ${this.getValueOrEmpty(model.date)}\n`;
    content += 'labels:\n';

    console.log(model.labels);
    for (let i = 0; i < model.labels.length; i += 1) {
      content += `  - ${this.getValueOrEmpty(model.labels[i])}\n`;
    }
    content += '---\n';
    content += this.getValueOrEmpty(model.content);

    fs.writeFileSync(writeTo, content);
    if (this.previousWritings.indexOf(fileTitle) === -1) {
      this.previousWritings.push(fileTitle);
    }

  }

  loadEssay(index: number) {
    this.buildNewForm();

    let content: string = fs.readFileSync(path.join(this.writingDir, this.previousWritings[index]), 'utf8');
    let header = content.substring(3, content.substring(3).indexOf('---') + 3).trim();
    console.log(header);
    let headerKeys = header.split('\n');

    let title = this.getValueFromKeyPair(headerKeys[2], ':');
    let date = this.getValueFromKeyPair(headerKeys[3], ':');
    let labels: string[] = [];
    for (let i = 5; i < headerKeys.length; i += 1) {
      labels.push(this.getValueFromKeyPair(headerKeys[i], '-'));
    }
    let essayContent = content.substring(content.substring(3).indexOf('---') + 6).trim();

    this.writingForm.controls['title'].setValue(title);
    this.writingForm.controls['date'].setValue(date);

    let formLabels = (<FormArray>this.writingForm.controls['labels']);
    for (let i = formLabels.controls.length; i < labels.length; i += 1) {
      this.addLabel();
    }
    for (let i = 0; i < labels.length; i += 1) {
      formLabels.at(i).setValue(labels[i]);
    }

    this.writingForm.controls['content'].setValue(essayContent);
    this.overwriteFile = index;
  }

  buildNewForm() {
    this.writingForm = new FormGroup({
      title: new FormControl(),
      date: new FormControl(),
      labels: new FormArray([
        new FormControl()
      ]),
      content: new FormControl()
    });

    (<FormControl>this.writingForm.controls['content']).valueChanges.subscribe( (data:string) =>
      this.updatePreview(data)
    );

    this.preview = '';
    this.overwriteFile = -1;
  }

}
