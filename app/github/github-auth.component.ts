import {Component} from "@angular/core";
import {GitHubAuthService} from "./github-auth.service";
import {Router} from "@angular/router";
import {INIT_CONFIG_LOADING} from "../app-routing.config";

@Component({
  moduleId: module.id,
  selector: 'github-auth-form',
  templateUrl: 'github-auth.component.html',
  providers: [GitHubAuthService]
})

export class GitHubAuthComponent {
  username = '';

  constructor(private gitHubAuthService: GitHubAuthService, private router: Router) {
    this.username = '';
  }

  signIn(): void {
    let redirectToDashboard = () => {
      this.router.navigateByUrl(INIT_CONFIG_LOADING)
    }

    this.gitHubAuthService.authorize(redirectToDashboard);
  }

}
