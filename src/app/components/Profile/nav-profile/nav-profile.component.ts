import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AutorisationService} from "../../../services/autorisation.service";


@Component({
  selector: 'app-nav-profile',
  templateUrl: './nav-profile.component.html',
  styleUrls: ['./nav-profile.component.css']
})
export class NavProfileComponent implements OnInit{

  autoList: Array<number> = new Array<number>()
  constructor(private router: Router,
              private aus: AutorisationService) {}

  btn() {
   $('.btn').toggleClass("click");
   $('.sidebar').toggleClass("show");
  }

  li() {$(this).addClass("active").siblings().removeClass("active"); this.btn()}


  ngOnInit(): void {this.autoList = this.aus.getItem('autoList')}



  logout() {
    this.router.navigate(['/home'])
    localStorage.removeItem('person')
    localStorage.removeItem('autoList')
  }

}

