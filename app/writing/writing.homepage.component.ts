import {Component, OnInit, NgZone, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {GlobalCacheService} from "../global/global.cache.service";
import {Router} from "@angular/router";
import {ESSAY} from "../app-routing.config";

declare var fs: any;
declare var path: any;
declare var _$: any

@Component({
  moduleId: module.id,
  templateUrl: 'writing.homepage.component.html',
})

export class WritingHomepageComponent implements OnInit {

  repoName: string;
  essays: string[] = [];
  projects: string[] = [];
  images: string[] = [];

  constructor(private cacheService: GlobalCacheService, private router: Router) {
    this.repoName = this.cacheService.repoName;
  }

  ngOnInit(): void {
    this.readFolder('essays', this.essays, 'md');
    this.readFolder('projects', this.projects, 'md');
    this.readFolder('images', this.images);
  }

  openModal(type: string, file: string) {
    console.log(type);
    console.log(file);
    this.router.navigate([`dashboard/(dashboard:dashboard/writing/(writing:dashboard/writing/${type}))`], { queryParams: { file: file } })
      .then(() => {
        _$('.ui.modal').modal('refresh');
        _$('.ui.modal')
          .modal('show');
      }
    );

  }

  private readFolder(dirName: string, fileArray: string[], extension?: string): void {
    let files = fs.readdirSync(path.join(this.cacheService.repoDir, dirName));
    for (let i = 0; i < files.length; i += 1) {
      if (extension != null) {
        if (files[i].endsWith(extension)) {
          fileArray.push(files[i]);
        }
      } else {
        fileArray.push(files[i]);
      }
    }
  }

}
