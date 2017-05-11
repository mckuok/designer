import {Injectable} from "@angular/core";
import {CLIENT_ID, SCOPE, CLIENT_SECRET, GITHUB_ACCESS_TOKEN_KEY} from "./github.config";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {User} from "./github-auth-user.model";
declare const electron: any;

@Injectable()
export class GitHubAuthService {

  private githubUrl = 'https://github.com/login/oauth/authorize?';
  private authWindow : any;

  constructor(private http: Http) {}

  checkAccessToken(): Observable<User> {
    let accessToken = window.localStorage.getItem(GITHUB_ACCESS_TOKEN_KEY);
    if (accessToken == null || accessToken.length == 0) {
      return null;
    } else {
      const encodedCredential = window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      const checkAuthUrl = `https://api.github.com/applications/${CLIENT_ID}/tokens/${accessToken}`;
      let headers = new Headers({ 'Content-Type': 'application/json',
                                  'Accept': 'application/json',
                                  'Authorization': `Basic ${encodedCredential}`});
      let options = new RequestOptions({ headers: headers });
      return this.http.get(checkAuthUrl, options).map(this.extractUserData).catch(this.handleError)
    }
  }


  verifyUsername(username: string) {
    const homepageUrl = `https://${username}.github.io`;
    console.log(homepageUrl);
    return this.http.get(homepageUrl)
      .map(res => { return res.status })
      .catch(this.handleError)

  }

  authorize(callback: Function): void {
    const authUrl: string = `${this.githubUrl}client_id=${CLIENT_ID}&scope=${SCOPE}`;
    const {BrowserWindow} = electron.remote;
    this.authWindow = new BrowserWindow({width: 800, height: 600});
    this.authWindow.loadURL(authUrl);

    this.authWindow.webContents.clearHistory();
    this.authWindow.webContents.session.clearCache(function() {});
    this.authWindow.webContents.openDevTools()
    this.authWindow.webContents.on('will-navigate', (event: any, url: any): void => {
      this.handleCallback(url, callback);
    });
    this.authWindow.webContents.on('did-get-redirect-request',(event: any, oldUrl: any, newUrl: any): void => {
      this.handleCallback(newUrl, callback);
    });
    // Reset the authWindow on close
    this.authWindow.on('close', function() {
      this.authWindow = null;
    }, false);

  }

  private handleCallback(url: string, callback: Function) {
    const raw_code = /code=([^&]*)/.exec(url) || null;
    const code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    const error = /\?error=(.+)$/.exec(url);

    if (code || error) {
      // Close the browser if code found or error
      this.authWindow.removeAllListeners();
      this.authWindow.destroy();
    }

    // If there is a code, proceed to get token from github
    if (code) {
      return this.requestGithubToken(code, callback);
    } else if (error) {
      alert('Oops! Something went wrong and we couldn\'t' +
        'log you in using Github. Please try again.');
    }
  }

  private requestGithubToken(code: string, callback: Function) {
    const url = 'https://github.com/login/oauth/access_token';
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code
      }, options)
      .map(this.saveToken)
      .catch(this.handleError)
      .subscribe(
        token => {
          window.localStorage.setItem(GITHUB_ACCESS_TOKEN_KEY, token);
          callback();
        },
        error => console.log
      );
  }

  private saveToken(res: Response): void {
    let body = res.json()
    return body.access_token;
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

  private extractUserData(res: Response) {
    if (res.status >= 400) {
      return null;
    }
    let body = res.json();
    if (body) {
      let user = new User(body.user.login, body.user.avatar_url);
      return user
    } else {
      return null;
    }

  }
}
