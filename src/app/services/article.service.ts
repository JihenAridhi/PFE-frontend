import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "../entities/Article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  add(article: Article)
  {
    article.date = new Date();
    this.http.post('http://localhost:8080/article/add', article)
  }
}
