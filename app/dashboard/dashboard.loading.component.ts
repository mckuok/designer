import {Component, AfterContentInit} from "@angular/core";
import {GitHubAuthService} from "../github/github-auth.service";
import {GlobalCacheService} from "../global/global.cache.service";
import {Observable} from "rxjs";
import {User} from "../github/github-auth-user.model";
import {Router} from "@angular/router";
import {DASHBOARD_HOME, GITHUB_AUTHORIZATION} from "../app-routing.config";

@Component({
  moduleId: module.id,
  selector: 'dashboard-loading',
  templateUrl: 'dashboard.loading.component.html',
  providers: [GitHubAuthService]
})

export class DashboardLoadingComponent implements AfterContentInit {

  constructor(private gitHubAuthService: GitHubAuthService, private persistenceService: GlobalCacheService,
              private router: Router) {}

  loadingMessage = 'Loading application configuration ...';
  errorMessage: string;

  ngAfterContentInit(): void {  //TODO: refactor
    let observable: Observable<User> = this.gitHubAuthService.checkAccessToken();
    if (observable) {
      observable.subscribe(returnedUser => {
          if (returnedUser) {
            this.persistenceService.user = returnedUser;
            this.gitHubAuthService.verifyUsername(this.persistenceService.user.username)
              .subscribe(
                result => {
                  console.log(result);
                  if (result < 400) {
                    this.persistenceService.hasPage = true;
                  } else {
                    this.persistenceService.hasPage = false;
                  }
                  this.router.navigateByUrl(DASHBOARD_HOME);
                  return;
                },
                error => {
                  this.errorMessage = <any>error;
                  if (this.errorMessage != '' || !this.errorMessage) {
                    this.persistenceService.hasPage = false;
                  }
                  this.router.navigateByUrl(DASHBOARD_HOME);
                  return;
                }
              )

          } else {
            this.router.navigateByUrl(GITHUB_AUTHORIZATION);
            return;
          }
        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != '' || !this.errorMessage) {
            this.router.navigateByUrl(GITHUB_AUTHORIZATION);
            return;
          }
        });
    } else {
      this.router.navigateByUrl(GITHUB_AUTHORIZATION);
      return;
    }
  }





}
