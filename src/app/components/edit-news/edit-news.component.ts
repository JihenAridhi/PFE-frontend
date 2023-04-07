import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {News} from "../../entities/News";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit{

  allNews: Array<News> = new Array<News>()
  ngOnInit(): void
  {
    this.ns.getAll()
    this.ns.allNews.asObservable().subscribe(data => this.allNews = data)
  }

  constructor(private ns: NewsService, private router: Router) {}

  delete(id: number|undefined)
  {this.ns.delete(id)/*.subscribe(()=> {
    alert('deleted')
    this.allNews = this.allNews.filter(del => del !== id)
  })*/}

  update(n: News)
  {

    this.router.navigate(['/account/add-news'])
    this.ns.get(n.id)
  }
}
