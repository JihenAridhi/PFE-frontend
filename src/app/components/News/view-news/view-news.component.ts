import {Component, OnInit} from '@angular/core';
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.css']
})
export class ViewNewsComponent implements OnInit{

  news: News = new News()
  url = ''

  constructor(private ns: NewsService) {}

  async ngOnInit()
  {
    this.news = this.ns.getItem('news')
    await this.ns.getPhoto(this.news.id).then(data => {if (data) this.url=data})
  }



}
