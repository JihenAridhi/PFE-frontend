import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "../entities/Article";
import * as CryptoJS from "crypto-js";
import {Person} from "../entities/Person";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  get(id: number)
  {return this.http.get('http://localhost:8000/article/get/'+id).toPromise()}
  getPersonArticles(id?: number)
  {
    if(id)
      return this.http.get<Article[]>('http://localhost:8000/article/getAll/'+id).toPromise()
    else
      return this.http.get<Article[]>('http://localhost:8000/article/getAll').toPromise()
  }

  save(article: any)
  {
    if(article.id)
      this.http.put('http://localhost:8000/article/update', article).subscribe(()=> alert('changes have been affected successfully !!'))
    else {
      article.date = new Date()
      this.http.post<Article>('http://localhost:8000/article/add', article).subscribe(() => alert('article have been posted successfully !! '))
    }
  }

  delete(id?: number) {
    this.http.delete('http://localhost:8000/article/delete/'+id).subscribe()
  }

  setFile(formData: FormData)
  {return this.http.post<string>('http://localhost:8000/article/file', formData).toPromise()}

  getFile(id: any)
  {return this.http.get<string>('http://localhost:8000/article/file/get/'+id).toPromise()}


  getAll() {
    return this.http.get<Article[]>('http://localhost:8000/article/getAll').toPromise()
  }
}
