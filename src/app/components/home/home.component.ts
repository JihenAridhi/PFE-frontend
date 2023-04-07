import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NewsService} from "../../services/news.service";
import {News} from "../../entities/News";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  allNews: News[] = new Array<News>()

  constructor(private router: Router, private ns: NewsService) {}

  ngOnInit(): void
  {
    this.ns.getAll()
    this.ns.allNews.asObservable().subscribe(data => this.allNews = data)
  }


  viewNews(id: number|undefined) {
    this.router.navigate(['/view-news'])
    this.ns.get(id)
  }
}
