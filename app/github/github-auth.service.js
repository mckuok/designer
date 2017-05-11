"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var github_config_1 = require("./github.config");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var github_auth_user_model_1 = require("./github-auth-user.model");
var GitHubAuthService = (function () {
    function GitHubAuthService(http) {
        this.http = http;
        this.githubUrl = 'https://github.com/login/oauth/authorize?';
    }
    GitHubAuthService.prototype.checkAccessToken = function () {
        var accessToken = window.localStorage.getItem(github_config_1.GITHUB_ACCESS_TOKEN_KEY);
        if (accessToken == null || accessToken.length == 0) {
            return null;
        }
        else {
            var encodedCredential = window.btoa(github_config_1.CLIENT_ID + ":" + github_config_1.CLIENT_SECRET);
            var checkAuthUrl = "https://api.github.com/applications/" + github_config_1.CLIENT_ID + "/tokens/" + accessToken;
            var headers = new http_1.Headers({ 'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Basic " + encodedCredential });
            var options = new http_1.RequestOptions({ headers: headers });
            return this.http.get(checkAuthUrl, options).map(this.extractUserData).catch(this.handleError);
        }
    };
    GitHubAuthService.prototype.verifyUsername = function (username) {
        var homepageUrl = "https://" + username + ".github.io";
        console.log(homepageUrl);
        return this.http.get(homepageUrl)
            .map(function (res) { return res.status; })
            .catch(this.handleError);
    };
    GitHubAuthService.prototype.authorize = function (callback) {
        var _this = this;
        var authUrl = this.githubUrl + "client_id=" + github_config_1.CLIENT_ID + "&scope=" + github_config_1.SCOPE;
        var BrowserWindow = electron.remote.BrowserWindow;
        this.authWindow = new BrowserWindow({ width: 800, height: 600 });
        this.authWindow.loadURL(authUrl);
        this.authWindow.webContents.clearHistory();
        this.authWindow.webContents.session.clearCache(function () { });
        this.authWindow.webContents.openDevTools();
        this.authWindow.webContents.on('will-navigate', function (event, url) {
            _this.handleCallback(url, callback);
        });
        this.authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
            _this.handleCallback(newUrl, callback);
        });
        // Reset the authWindow on close
        this.authWindow.on('close', function () {
            this.authWindow = null;
        }, false);
    };
    GitHubAuthService.prototype.handleCallback = function (url, callback) {
        var raw_code = /code=([^&]*)/.exec(url) || null;
        var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
        var error = /\?error=(.+)$/.exec(url);
        if (code || error) {
            // Close the browser if code found or error
            this.authWindow.removeAllListeners();
            this.authWindow.destroy();
        }
        // If there is a code, proceed to get token from github
        if (code) {
            return this.requestGithubToken(code, callback);
        }
        else if (error) {
            alert('Oops! Something went wrong and we couldn\'t' +
                'log you in using Github. Please try again.');
        }
    };
    GitHubAuthService.prototype.requestGithubToken = function (code, callback) {
        var url = 'https://github.com/login/oauth/access_token';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(url, {
            client_id: github_config_1.CLIENT_ID,
            client_secret: github_config_1.CLIENT_SECRET,
            code: code
        }, options)
            .map(this.saveToken)
            .catch(this.handleError)
            .subscribe(function (token) {
            window.localStorage.setItem(github_config_1.GITHUB_ACCESS_TOKEN_KEY, token);
            callback();
        }, function (error) { return console.log; });
    };
    GitHubAuthService.prototype.saveToken = function (res) {
        var body = res.json();
        return body.access_token;
    };
    GitHubAuthService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    GitHubAuthService.prototype.extractUserData = function (res) {
        if (res.status >= 400) {
            return null;
        }
        var body = res.json();
        if (body) {
            var user = new github_auth_user_model_1.User(body.user.login, body.user.avatar_url);
            return user;
        }
        else {
            return null;
        }
    };
    GitHubAuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GitHubAuthService);
    return GitHubAuthService;
}());
exports.GitHubAuthService = GitHubAuthService;
//# sourceMappingURL=github-auth.service.js.map