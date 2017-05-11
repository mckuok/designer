import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {GlobalCacheService} from "../global/global.cache.service";
import {TECHFOLIO_OWNER, TECHFOLIO_TEMPLATE_REPO, GITHUB_ACCESS_TOKEN_KEY} from "./github.config";
import {Observable} from "rxjs/Rx";

declare var child_process: any;

@Injectable()
export class GitHubApiService {

  constructor(private http: Http, private cacheService: GlobalCacheService) {}

  forkTechfolio() {
    const templateUrl = `https://api.github.com/repos/${TECHFOLIO_OWNER}/${TECHFOLIO_TEMPLATE_REPO}/forks`;
    let headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `token ${window.localStorage.getItem(GITHUB_ACCESS_TOKEN_KEY)}`});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(templateUrl, {}, options)
      .map(res => {return res.json()})
      .catch(this.handleError);
  }

  editRepo(body: Object) {
    const editUrl = `https://api.github.com/repos/${this.cacheService.user.username}/${TECHFOLIO_TEMPLATE_REPO}`
    let headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `token ${window.localStorage.getItem(GITHUB_ACCESS_TOKEN_KEY)}`});
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(editUrl, body, options)
      .map(res => {return res.json()})
      .catch(this.handleError);
  }

  pushChanges(repoName: string) {
    const commit = 'git add -A && git commit -m "updates"';
    const push = `git push https://${this.cacheService.user.username}:${window.localStorage.getItem(GITHUB_ACCESS_TOKEN_KEY)}@github.com/${this.cacheService.user.username}/${repoName}.git master`;

    child_process.execSync(`cd ${repoName} && ${commit}`);
    child_process.execSync(`cd ${repoName} && ${push}`);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
