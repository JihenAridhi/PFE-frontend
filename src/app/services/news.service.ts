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

  constructor(private http: HttpClient, private router: Router) {}

  getAll(){this.http.get('http://localhost:8000/news/getAll').subscribe(console.log)}

  get(id: number){this.http.get('http://localhost:8000/get/'+id).subscribe(
    (data: News) =>
    {
      console.log(data)
      this.router.navigate(['/account/add-news'])
      this.news.next(data)
    }
  )}

  save(news: News)
  {
    if(!news.id)
      this.http.post('http://localhost:8000/news/add', news).subscribe((data)=>console.log(data))
    else
      this.http.put('http://localhost:8000/news/update', news).subscribe((data)=>console.log(data))
  }
}
