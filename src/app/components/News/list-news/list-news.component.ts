import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit
{
  newsList: Array<News> = new Array<News>()
  url: string[] = [];

  constructor(private router: Router, private ns: NewsService) {}

  async ngOnInit()
  {
    await this.ns.getAll().then( async data =>
    {
      if (data)
        this.newsList = data
      for (let i = 0; i<this.newsList.length; i++)
        await this.ns.getPhoto(this.newsList[i].id).then(data => {if (data) this.url[i] = data})
    })
  }


  viewNews(n: News) {
    this.ns.setItem('news', n)
    this.router.navigate(['/view-news'])
  }

}
