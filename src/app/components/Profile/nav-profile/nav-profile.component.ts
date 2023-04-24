import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AutorisationService} from "../../../services/autorisation.service";
import {LanguageService} from "../../../services/language.service";


@Component({
  selector: 'app-nav-profile',
  templateUrl: './nav-profile.component.html',
  styleUrls: ['./nav-profile.component.css']
})
export class NavProfileComponent implements OnInit{

  autoList: Array<number> = new Array<number>()
  content: any
  constructor(private router: Router, private aus: AutorisationService, private ls: LanguageService) {this.ls.getLanguage().subscribe(data => this.content=data)}

  btn() {
   $('.btn').toggleClass("click");
   $('.sidebar').toggleClass("show");
  }

  li() {$(this).addClass("active").siblings().removeClass("active"); this.btn()}


  ngOnInit(): void {this.autoList = this.aus.getItem('autoList')}



  async logout() {
    await this.router.navigate(['/home'])
    localStorage.removeItem('person')
    localStorage.removeItem('autoList')
  }

}

