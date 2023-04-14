import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {NewsService} from "../../../services/news.service";
import {AutorisationService} from "../../../services/autorisation.service";
import {EventService} from "../../../services/event.service";
import {ArticleService} from "../../../services/article.service";
import {FeedbackService} from "../../../services/feedback.service";


@Component({
  selector: 'app-nav-profile',
  templateUrl: './nav-profile.component.html',
  styleUrls: ['./nav-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavProfileComponent implements OnInit{

  autoList: Array<number> = new Array<number>()
  constructor(private router: Router,
              private ps: PersonService,
              private ns: NewsService,
              private aus: AutorisationService,
              private es: EventService,
              private ars: ArticleService,
              private fs: FeedbackService) {}

  btn() {
   $('.btn').toggleClass("click");
   $('.sidebar').toggleClass("show");
  }

  li() {$(this).addClass("active").siblings().removeClass("active");}


  ngOnInit(): void {this.autoList = this.aus.getItem('autoList')}



  logout() {
    this.router.navigate(['/home'])
    localStorage.clear()
  }



  /*async news() {
    await this.ns.getAll().then(data => this.ns.setItem('newsList', data))
    await this.router.navigate(['account/edit-news'])
  }

  async events() {
    await this.es.getAll().then(data => this.es.setItem('eventList', data))
    await this.router.navigate(['account/edit-event'])
  }

  async members() {

    await this.router.navigate(['/account/members'])
  }

  async feedback() {

  }

  async requests() {
    await this.ps.getStatus(false).then(data => this.ps.setItem('personList', data))
    await this.router.navigate(['/account/requests'])
  }*/
}

