import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {NewsService} from "../../../services/news.service";
import {AutorisationService} from "../../../services/autorisation.service";


@Component({
  selector: 'app-nav-profile',
  templateUrl: './nav-profile.component.html',
  styleUrls: ['./nav-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavProfileComponent implements OnInit{

  autoList: Array<number> = new Array<number>()
  constructor(private ps: PersonService,
              private router: Router,
              private ns: NewsService,
              private as: AutorisationService) {}

  btn() {
   $('.btn').toggleClass("click");
   $('.sidebar').toggleClass("show");
  }

  li() {$(this).addClass("active").siblings().removeClass("active");}


  ngOnInit(): void {
    //this.ps.autorisations.asObservable().subscribe(data=> (this.autorisation = data))
    let a = localStorage.getItem('autoList')
        if(a)
          Object.assign(this.autoList, JSON.parse(a))
          console.log(this.autoList)
        }



  logout() {
    this.ps.isAuthenticated = false
    this.router.navigate(['/home'])
    localStorage.clear()
  }



  news() {


  }

  events() {

  }

  async members() {
    await this.ps.getStatus(true).then(data => localStorage.setItem('personList', JSON.stringify(data)))
    await this.as.getAllAutorisations().then(data => localStorage.setItem('allAutoList', JSON.stringify(data)))
    this.router.navigate(['/account/members'])
  }

  feedback() {

  }

  requests() {

  }
}

