import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { githubModel } from 'src/app/models/githubModel';
import { repoModel } from 'src/app/models/repoMdel';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  constructor(private http: HttpClient) { }

  configUrl = environment.githubApi;

  getGithubDataList() {
    return this.http.get(this.configUrl).pipe(
      map((res: githubModel) =>
        res.items.map(repo => this.mapGithubDataList(repo))
          .filter((repo: repoModel) => repo.intervalTime <= 30))
    );
  }

  mapGithubDataList(repo) {
    let daysInterval = Math.floor(Math.abs(new Date("2017-11-22T00:00:00Z").getTime() - new Date(repo.created_at).getTime()) / (1000 * 60 * 60 * 24))

    return {
      avatarOwnerUrl: repo.owner.avatar_url,
      repoName: repo.name,
      repoDescription: repo.description,
      nbStars: repo.stargazers_count,
      nbIssues: repo.has_issues ? repo.open_issues : 0,
      intervalTime: daysInterval,
      ownerName: repo.owner.login

    }

  }


}
