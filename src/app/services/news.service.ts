import { Injectable } from '@angular/core';
import {News} from "../entities/News";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: BehaviorSubject<News> = new BehaviorSubject<News>(new News())
  allNews : BehaviorSubject<News[]> = new BehaviorSubject<News[]>(new Array<News>())

  constructor(private http: HttpClient, private router: Router) {}

  getAll(){this.http.get<News[]>('http://localhost:8000/news/getAll').subscribe(data => {
    this.allNews.next(data)
    console.log(data)
  })}

  get(id: number|undefined){this.http.get('http://localhost:8000/news/get/'+id).subscribe(
    (data: News) =>
    {
      this.news.next(data)
    }
  )}

  save(news: News)
  {
    console.log(news)
    if(!news.id)
      this.http.post('http://localhost:8000/news/add', news).subscribe(()=> alert('news have been posted successfully !! '))
    else
      this.http.put('http://localhost:8000/news/update', news).subscribe(()=> alert('changes have been affected successfully !!'))
  }

  delete(id: number|undefined) {this.http.delete('http://localhost:8000/news/delete/'+id).subscribe(()=>alert('deleted'))}
}
