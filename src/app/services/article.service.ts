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
  getPerspnArticles(id?: number)
  {
    if(id)
      return this.http.get<Article[]>('http://localhost:8000/article/getAll/'+id).toPromise()
    else
      return this.http.get<Article[]>('http://localhost:8000/article/getAll').toPromise()
  }

  save(article: any)
  {
    if(article.id)
      this.http.put('http://localhost:8000/article/update', article).subscribe(()=> {
          this.setAuthors(article.id, article.authors);
          alert('changes have been affected successfully !!')})
    else {
      article.date = new Date()
      this.http.post<Article>('http://localhost:8000/article/add', article).subscribe((data) => {
          if (data)
            this.setAuthors(data.id, article.authors)
          alert('article have been posted successfully !! ')
        }
      )
    }
  }

  delete(id?: number) {
    this.http.delete('http://localhost:8000/article/delete/'+id).subscribe()
  }

  setItem(key: string, value: any) {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), 'key').toString();
    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, 'key').toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedValue);
    }
    return null;
  }

  getAuthors(id?: number)
  {return this.http.get<Person[]>('http://localhost:8000/article/'+id+'/getAuthors').toPromise()}

  setAuthors(id?: number, authors?: number[])
  {this.http.post('http://localhost:8000/article/'+id+'/setAuthors', authors).subscribe(()=>console.log('authors added'))}
}
