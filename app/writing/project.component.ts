import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, FormArray} from "@angular/forms";
import {GlobalCacheService} from "../global/global.cache.service";
import {Project} from "./project.interface";
import {SanitizeHtml} from "./sanitize.pipe";
import {WritingComponent} from "./writing.component";

declare var path: any;
declare var fs: any;

@Component({
  moduleId: module.id,
  selector: 'project',
  templateUrl: 'project.component.html',
})

export class ProjectComponent extends WritingComponent implements OnInit {

  private overwriteFile: number;

  constructor(private cacheService: GlobalCacheService){
    super(cacheService, path.join(cacheService.repoDir, 'projects'));
  }


  ngOnInit(): void {
    this.init();
  }

  save(model: Project) {
    const type = 'project';
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
    content += `image: ${this.getValueOrEmpty(model.image)}\n`;
    content += `title: "${this.getValueOrEmpty(model.title)}"\n`;
    content += `permalink: ${this.getValueOrEmpty(model.permalink)}\n`;
    content += `date: ${this.getValueOrEmpty(model.date)}\n`;

    content += 'labels:\n';
    for (let i = 0; i < model.labels.length; i += 1) {
      content += `  - ${this.getValueOrEmpty(model.labels[i])}\n`;
    }

    content += `summary: ${this.getValueOrEmpty(model.summary)}\n`;
    content += '---\n';
    content += this.getValueOrEmpty(model.content);

    fs.writeFileSync(writeTo, content);
    if (this.previousWritings.indexOf(fileTitle) === -1) {
      this.previousWritings.push(fileTitle);
    }

  }

  loadProject(index: number) {
    this.buildNewForm();

    let content: string = fs.readFileSync(path.join(this.writingDir, this.previousWritings[index]), 'utf8');
    let header = content.substring(3, content.substring(3).indexOf('---') + 3).trim();
    console.log(header);
    let headerKeys = header.split('\n');

    let image = this.getValueFromKeyPair(headerKeys[2], ':');
    let title = this.getValueFromKeyPair(headerKeys[3], ':');
    let permalink = this.getValueFromKeyPair(headerKeys[4], ':');
    let date = this.getValueFromKeyPair(headerKeys[5], ':');
    let labels: string[] = [];
    for (let i = 7; i < headerKeys.length - 1; i += 1) {
      labels.push(this.getValueFromKeyPair(headerKeys[i], '-'));
    }
    let summary = this.getValueFromKeyPair(headerKeys[headerKeys.length - 1], ':');
    let projectContent = content.substring(content.substring(3).indexOf('---') + 6).trim();

    this.writingForm.controls['title'].setValue(title);
    this.writingForm.controls['date'].setValue(date);

    let formLabels = (<FormArray>this.writingForm.controls['labels']);
    for (let i = formLabels.controls.length; i < labels.length; i += 1) {
      this.addLabel();
    }
    for (let i = 0; i < labels.length; i += 1) {
      formLabels.at(i).setValue(labels[i]);
    }

    this.writingForm.controls['summary'].setValue(summary);
    this.writingForm.controls['content'].setValue(projectContent);
    this.overwriteFile = index;
  }

  buildNewForm() {
    this.writingForm = new FormGroup({
      image: new FormControl(),
      title: new FormControl(),
      permalink: new FormControl(),
      date: new FormControl(),
      labels: new FormArray([
        new FormControl()
      ]),
      summary: new FormControl(),
      content: new FormControl()
    });

    (<FormControl>this.writingForm.controls['content']).valueChanges.subscribe( (data:string) =>
      this.updatePreview(data)
    );

    this.preview = '';
    this.overwriteFile = -1;
  }

}
