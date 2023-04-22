import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit{

  newsList: Array<News> = new Array<News>()
  async ngOnInit()
  {
    await this.ns.getAll().then(data => {if (data) this.newsList = data})
  }

  constructor(private ns: NewsService) {}
  delete(n: News)
  {
    let result = confirm('are you sure ?')
    if (result) {
      this.ns.delete(n.id)
      this.newsList = this.newsList.filter(i => i !== n)
      this.ns.setItem('newsList', this.newsList)
    }
  }
}
