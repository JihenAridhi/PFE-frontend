import {Component, OnInit} from '@angular/core';
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.css']
})
export class ViewNewsComponent implements OnInit{

  news: News = new News()
  url = ''

  constructor(private ns: NewsService, private route: ActivatedRoute) {}

  async ngOnInit()
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    await this.ns.get(id).then(data => this.news=data!)
    await this.ns.getPhoto(this.news.id).then(data => this.url=data!)
  }



}
