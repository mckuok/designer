import {User} from "../github/github-auth-user.model";

export class GlobalCacheService {
  constructor() {}
  user: User;
  hasPage: boolean;
  root: string;
  repoDir: string;
  repoName: string;
}
