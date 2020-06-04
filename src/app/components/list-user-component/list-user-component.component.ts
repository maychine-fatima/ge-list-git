import { Component, OnInit } from '@angular/core';
import { ListServiceService } from 'src/app/services/list-service/list-service.service';
import { repoModel } from 'src/app/models/repoMdel';

@Component({
  selector: 'app-list-user-component',
  templateUrl: './list-user-component.component.html',
  styleUrls: ['./list-user-component.component.css']
})
export class ListUserComponentComponent implements OnInit {

  constructor(private listService: ListServiceService) { }

  reposOfTheMonth: repoModel[]

  ngOnInit(): void {
    this.listService.getGithubDataList().subscribe(
      (repos: repoModel[]) => {
        this.reposOfTheMonth = repos;
      }
    )
  }

}
