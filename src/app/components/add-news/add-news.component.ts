import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NewsService} from "../../services/news.service";
import {News} from "../../entities/News";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit{

  news: News = new News()
  constructor(private ns: NewsService) {}

  save(form: NgForm)
  {
    let news = form.value
    news.date = new Date()
    news.id=this.news.id
    this.ns.save(news)
  }



  ngOnInit(): void {this.ns.news.asObservable().subscribe(data => this.news = data)}


}
