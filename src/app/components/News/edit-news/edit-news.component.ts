import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit{

  newsList: Array<News> = new Array<News>()
  ngOnInit(): void
  {
    //this.newsList = this.ns.getItem('newsList')
    this.ns.getAll().then(data => {if (data) this.newsList = data})
  }

  constructor(private ns: NewsService, private router: Router) {}

  delete(n: News)
  {
    let result = confirm('are you sure ?')
    if (result) {
      this.ns.delete(n.id)
      this.newsList = this.newsList.filter(i => i !== n)
      this.ns.setItem('newsList', this.newsList)
    }
  }

  async update(n: News)
  {
    this.ns.setItem('news', n)
    await this.router.navigate(['/account/save-news'])

  }

  async add() {
    this.ns.setItem('news', new News())
    await this.router.navigate(['/account/save-news'])
  }
}
