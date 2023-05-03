import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit
{
  newsList: Array<News> = new Array<News>()
  url: string[] = [];
  filteredList: News[] = []
  recentValue: any;
  olderValue = new Date().toISOString().substring(0, 10);
  content: any

  constructor(private router: Router, private ns: NewsService, private ls: LanguageService) {    this.ls.getLanguage().subscribe(data => this.content = data)}

  async ngOnInit()
  {
    await this.ns.getAll().then( async data =>
    {
      if (data)
        this.newsList = data
      this.onSearchTextEntered('')
    })
  }

  async onSearchTextEntered(searchText: string) {
    if (searchText=='')
      this.filteredList = this.newsList
    else
      this.filteredList = this.newsList.filter(news => news.title?.includes(searchText))
    for (let i = 0; i<this.filteredList.length; i++)
      await this.ns.getPhoto(this.filteredList[i].id).then(data => {if (data) this.url[i] = data})
  }

  interval() {
    if (!this.olderValue && !this.recentValue)
      this.filteredList = this.newsList
    else {
      this.filteredList = this.newsList.filter(article => {
        return new Date(article.date!).toISOString().substring(0, 10) <= this.olderValue! &&
          new Date(article.date!).toISOString().substring(0, 10) >= this.recentValue!
      })
      console.log(this.filteredList)
    }
  }
}
