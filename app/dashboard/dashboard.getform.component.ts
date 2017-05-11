import {Component} from "@angular/core";
import {GlobalCacheService} from "../global/global.cache.service";
import {GitHubApiService} from "../github/github.api.service";

declare var fs: any;
declare var child_process: any;
declare var path: any;
declare var electron: any;

@Component({
  moduleId: module.id,
  selector: 'dashboard-getform',
  templateUrl: 'dashboard.getform.component.html',
  providers: [GitHubApiService]
})

export class DashboardGetFormComponent {

  liveUrl: string;
  username: string;
  avatar: string;
  windowHeight: number;

  constructor(private cacheService: GlobalCacheService, private gitService: GitHubApiService) {
    const repoName = `${cacheService.user.username}.github.io`;
    this.liveUrl = `https://${repoName}`;
    if (!fs.existsSync(path.join(`${this.cacheService.root}`, `${repoName}`))) {
      const cloneUrl = `https://github.com/${cacheService.user.username}/${repoName}.git`
      child_process.execSync(`git clone ${cloneUrl}`);
    } else {
      child_process.execSync(`cd ${repoName} && git pull origin master`);
    }
    this.cacheService.repoName = repoName;
    this.cacheService.repoDir = path.normalize(`${this.cacheService.root}/${repoName}`);

    this.username = this.cacheService.user.username;
    this.avatar = this.cacheService.user.avatarUrl;

    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    this.windowHeight = height;
  }

  pushLive() {
    try {
      this.gitService.pushChanges(this.cacheService.repoName);
    }
    catch(ex) {}
  }

}
