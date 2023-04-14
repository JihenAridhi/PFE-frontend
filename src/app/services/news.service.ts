import { Injectable } from '@angular/core';
import {News} from "../entities/News";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news = new BehaviorSubject<News>(new News())
  constructor(private http: HttpClient, private router: Router) {}

  getAll(){return this.http.get<News[]>('http://localhost:8000/news/getAll')/*.subscribe(data => this.allNews.next(data))*/}

  get(id: number|undefined){this.http.get('http://localhost:8000/news/get/'+id).subscribe(
    (data: News) =>
      this.news.next(data)
  )}

  save(news: News)
  {
    if(!news.id)
      this.http.post('http://localhost:8000/news/add', news).subscribe(()=> alert('news have been posted successfully !! '))
    else
      this.http.put('http://localhost:8000/news/update', news).subscribe(()=> alert('changes have been affected successfully !!'))
  }

  delete(id: number|undefined) {return this.http.delete('http://localhost:8000/news/delete/'+id)}

  setPhoto(formData: FormData)
  {return this.http.post<string>('http://localhost:8000/photo/news', formData).toPromise()}

  getPhoto(id: any)
  {return this.http.get<string>('http://localhost:8000/photo/news/get/'+id).toPromise()}
}
