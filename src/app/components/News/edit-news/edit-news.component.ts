import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit{

  newsList: Array<News> = new Array<News>()
  content: any
  async ngOnInit()
  {
    await this.ns.getAll().then(data => {if (data) this.newsList = data})
  }

  constructor(private ns: NewsService, private ls: LanguageService) {this.ls.getLanguage().subscribe(data => this.content=data)}
  delete(n: News)
  {
    let result = confirm('are you sure ?')
    if (result) {
      this.ns.delete(n.id)
      this.newsList = this.newsList.filter(i => i !== n)
    }
  }
}
