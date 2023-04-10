import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {News} from "../../entities/News";
import {Router} from "@angular/router";
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit
{
  allNews: Array<News> = new Array<News>()

  constructor(private router: Router, private ns: NewsService) {}

  ngOnInit(): void
  {
    this.ns.getAll().subscribe(data => this.allNews = data)
    //this.ns.allNews.asObservable().subscribe(data => this.allNews = data)
  }


  viewNews(id: number|undefined) {
    this.router.navigate(['/view-news'])
    this.ns.get(id)
  }

}
