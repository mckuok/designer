import {Component, OnChanges, SimpleChanges} from "@angular/core";
import {GitHubApiService} from "../github/github.api.service";
import {GlobalCacheService} from "../global/global.cache.service";
import {Router} from "@angular/router";
import {DASHBOARD_HOME, INIT_CONFIG_LOADING} from "../app-routing.config";

declare var fs: any;
declare var child_process: any;
declare var path: any;

@Component({
  moduleId: module.id,
  selector: 'dashboard-create',
  templateUrl: 'dashboard.create.component.html',
  providers: [GitHubApiService]
})

export class DashboardCreateTechfolioComponent {

  hasPage: boolean;
  progressMessages: string[] = [];
  buttonText: string;

  constructor(private gitHubApiService: GitHubApiService, private cacheService: GlobalCacheService, private router: Router){
    this.hasPage = this.cacheService.hasPage ;
    this.buttonText = 'Create New Techfolio';
    if (this.hasPage || this.isLocalRepoExisted()) {
      this.hasPage = true;
      this.progressMessages.push('We detected you have created your TechFolio, but GitHub has yet to reflect those changes. Please try again with Designer 5 minutes later to allow GitHub to pick up the changes');
      this.buttonText = 'Refresh';
    }
  }

  forkTechfolio() {   // TODO refactor
    this.progressMessages.push('Forking Techfolio template repository');
    if (!this.isLocalRepoExisted()) {
      this.gitHubApiService.forkTechfolio().subscribe(
        res => {
          this.progressMessages.push('Finished forking Techfolio template repository');
          this.configureTemplateReo(res.clone_url);
        },
        error => {
          console.log(<any>error);
        }
      );
    } else {
      this.progressMessages.push('Finished forking Techfolio template repository');
      this.router.navigateByUrl(INIT_CONFIG_LOADING);
    }

  }

  private configureTemplateReo(url: string) {
    this.progressMessages.push('Updating template information with customized information');

    const updatedInfo = {
      name: this.cacheService.repoName,
      description: `Technical Portfolio https://${this.cacheService.user.username}.github.io/`,
      homepage: `https://${this.cacheService.user.username}.github.io/`
    };

    this.gitHubApiService.editRepo(updatedInfo).subscribe(
      res => {
        this.progressMessages.push('Finished updating template information with customized information');
        if (!this.isLocalRepoExisted()) {
          this.cloneToLocal(res.clone_url);
          this.editConfigYml(res.name);

          this.progressMessages.push('Pushing changes to remote repository');
          this.gitHubApiService.pushChanges(res.name);
          this.progressMessages.push('Finished pushing changes to remote repository');
        }

        this.cacheService.hasPage = true;
        setTimeout(() => {
          this.router.navigateByUrl(INIT_CONFIG_LOADING);
        }, 5000);
      },
      error => (console.log(<any>error))
    );
  }

  private cloneToLocal(url: string) {
    this.progressMessages.push('Cloning remote repository into local machine');
    child_process.execSync(`git clone ${url}`);
    this.progressMessages.push('Finished cloning remote repository into local machine');
  }

  private editConfigYml(repoName: string) {
    this.progressMessages.push('Editing _config.yml to replace the default URL to your GitHub homepage URL');
    const configYml = `${repoName}/_config.yml`;
    let contents = fs.readFileSync(configYml, 'utf8').split('\n');
    let newContents: Array<string> = new Array(contents.length);
    for (let i = 0; i < contents.length; i += 1) {
      if (contents[i].startsWith('url')) {
        newContents[i] = `url: "https://${repoName}"`;
      } else if (contents[i].startsWith('baseurl')) {
        newContents[i] = 'baseurl: ""';
      } else {
        newContents[i] = contents[i];
      }
    }

    fs.writeFileSync(configYml, newContents.join('\n'));
    this.progressMessages.push('Finished editing _config.yml');
  }

  private isLocalRepoExisted() {
    return fs.existsSync(this.cacheService.repoDir);
  }

}
