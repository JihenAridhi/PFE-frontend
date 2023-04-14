import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  newsList: News[] = new Array<News>()
  url: string[] = [];

  constructor(private router: Router, private ns: NewsService) {}

  ngOnInit(): void
  {

    this.ns.getAll().then(data =>
    {
      if (data)
        this.newsList = data
      for (let i = 0; i<this.newsList.length; i++)
        this.ns.getPhoto(this.newsList[i].id).then(data => {if (data) this.url[i] = data})
    })
  }


  viewNews(id: number|undefined) {
    this.router.navigate(['/view-news'])
    this.ns.get(id)
  }
}
