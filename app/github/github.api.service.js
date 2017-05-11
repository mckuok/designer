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
var http_1 = require("@angular/http");
var global_cache_service_1 = require("../global/global.cache.service");
var github_config_1 = require("./github.config");
var Rx_1 = require("rxjs/Rx");
var GitHubApiService = (function () {
    function GitHubApiService(http, cacheService) {
        this.http = http;
        this.cacheService = cacheService;
    }
    GitHubApiService.prototype.forkTechfolio = function () {
        var templateUrl = "https://api.github.com/repos/" + github_config_1.TECHFOLIO_OWNER + "/" + github_config_1.TECHFOLIO_TEMPLATE_REPO + "/forks";
        var headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "token " + window.localStorage.getItem(github_config_1.GITHUB_ACCESS_TOKEN_KEY) });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(templateUrl, {}, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GitHubApiService.prototype.editRepo = function (body) {
        var editUrl = "https://api.github.com/repos/" + this.cacheService.user.username + "/" + github_config_1.TECHFOLIO_TEMPLATE_REPO;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "token " + window.localStorage.getItem(github_config_1.GITHUB_ACCESS_TOKEN_KEY) });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.patch(editUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GitHubApiService.prototype.pushChanges = function (repoName) {
        var commit = 'git add -A && git commit -m "updates"';
        var push = "git push https://" + this.cacheService.user.username + ":" + window.localStorage.getItem(github_config_1.GITHUB_ACCESS_TOKEN_KEY) + "@github.com/" + this.cacheService.user.username + "/" + repoName + ".git master";
        child_process.execSync("cd " + repoName + " && " + commit);
        child_process.execSync("cd " + repoName + " && " + push);
    };
    GitHubApiService.prototype.handleError = function (error) {
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
    GitHubApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, global_cache_service_1.GlobalCacheService])
    ], GitHubApiService);
    return GitHubApiService;
}());
exports.GitHubApiService = GitHubApiService;
//# sourceMappingURL=github.api.service.js.map