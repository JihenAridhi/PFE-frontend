import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {NewsService} from "../../../services/news.service";
import {AutorisationService} from "../../../services/autorisation.service";
import {Person} from "../../../entities/Person";


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
   /* let a = localStorage.getItem('autoList')
        if(a)
          Object.assign(this.autoList, JSON.parse(a))*/
    this.autoList = this.as.getItem('autoList')
  }



  logout() {
    this.router.navigate(['/home'])
    localStorage.clear()
  }



  news() {


  }

  events() {

  }

  async members() {/*
    let personList: Person[] = []
    let autoList: number[][]
    await this.ps.getStatus(true).then(data => {if (data) personList = data})
    for (let i=0; i<personList.length; i++)
      await this.as.getAutorisations(personList[i]).then(data => {if(data) autoList[i] = data.map(r=>r.id)})*/
    await this.ps.getStatus(true).then(data => this.as.setItem('personList', data))
    await this.as.getAllAutorisations().then(data => this.as.setItem('personAutoList', data))
    await this.router.navigate(['/account/members'])
  }

  async feedback() {

  }

  async requests() {
    await this.ps.getStatus(false).then(data => this.ps.setItem('personList', data))
    await this.router.navigate(['/account/requests'])
  }
}

