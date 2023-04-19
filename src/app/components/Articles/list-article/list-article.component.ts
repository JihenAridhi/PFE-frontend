import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  article= new Article()
  authors: Person[] = []

  constructor(private ps: PersonService, private as: ArticleService) {}

   async toggle(a: Article) {
    const popup = document.getElementById('popup') as HTMLElement;
    popup.classList.toggle('active');
    this.article = a;
    await this.as.getAuthors(this.article.id).then(data => {if (data) this.authors = data})
  }

  async ngOnInit()
  {
    console.log(localStorage.getItem('person') as Person)
    if(localStorage.getItem('person'))
      await this.as.getPerspnArticles(this.ps.getItem('person').id).then(data => {if (data) this.articles = data})
    else
      await this.as.getPerspnArticles().then(data => {if (data) this.articles = data})
  }


}
