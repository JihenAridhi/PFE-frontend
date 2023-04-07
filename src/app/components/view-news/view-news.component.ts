import {Component, OnInit} from '@angular/core';
import {News} from "../../entities/News";
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.css']
})
export class ViewNewsComponent implements OnInit{

  news: News = new News()

  constructor(private ns: NewsService) {}

  ngOnInit(): void {this.ns.news.asObservable().subscribe(data => this.news=data)}



}
