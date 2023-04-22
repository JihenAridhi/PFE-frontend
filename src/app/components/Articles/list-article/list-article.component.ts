import {Component, OnInit} from '@angular/core';
import {Article} from "../../../entities/Article";
import {ArticleService} from "../../../services/article.service";
import {PersonService} from "../../../services/person.service";
import {Person} from "../../../entities/Person";

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit{

  articles: Article[] = []
  filteredList: Article[] = []
  article= new Article()
  authors: Person[] = []
  recentValue: any;
  olderValue = new Date().toISOString().substring(0, 10);

  constructor(private ps: PersonService, private as: ArticleService) {}

   async toggle(a: Article) {
    const popup = document.getElementById('popup') as HTMLElement;
    popup.classList.toggle('active');
    this.article = a;
    await this.as.getAuthors(this.article.id).then(data => {if (data) this.authors = data})
  }

  async ngOnInit()
  {
    const id = localStorage.getItem('person') ? this.ps.getItem('person').id : undefined;
    await this.as.getPerspnArticles(id).then(data =>
    {
      this.articles = data!
      this.filteredList = this.articles
    })
  }


  onSearchTextEntered(searchText: string) {
    if (searchText=='')
      this.filteredList = this.articles
    else
      this.filteredList = this.articles.filter(article => article.title?.includes(searchText))
  }

  interval() {
    if (!this.olderValue && !this.recentValue)
      this.filteredList = this.articles
    else {
      this.filteredList = this.articles.filter(article => {
        /*console.log(this.recentValue)
        console.log(new Date(article.date!).toISOString().substring(0, 10))
        console.log(this.olderValue)
        console.log('---------------------------')*/
        return new Date(article.date!).toISOString().substring(0, 10) <= this.olderValue! &&
        new Date(article.date!).toISOString().substring(0, 10) >= this.recentValue!
      })
      console.log(this.filteredList)
    }
  }

  a() {
    console.log(this.olderValue)
    console.log(this.recentValue)
  }
}
