import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PersonService} from "../../services/person.service";

@Component({
  selector: 'app-nav-profil',
  templateUrl: './nav-profil.component.html',
  styleUrls: ['./nav-profil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavProfilComponent implements OnInit{

  autorisation: Array<string> = new Array<string>()

  constructor(private ps: PersonService) {}

  btn() {
   $('.btn').toggleClass("click");
   $('.sidebar').toggleClass("show");
  }

  li() {$(this).addClass("active").siblings().removeClass("active");}

  ngOnInit(): void {
    this.ps.autorisations.asObservable().subscribe(data => {
      let auto: Array<string> = new Array<string>()
      for (let i=0; i<data.length; i++)
        auto[i] = data[i].autorisation
      this.autorisation = auto
    })
  }

/*  feat_btn() {
    $('nav ul .feat-show').toggleClass("show");
    $('nav ul .first').toggleClass("rotate");
  }

  serv_btn() {
    $('nav ul .serv-show').toggleClass("show1");
    $('nav ul .second').toggleClass("rotate");
  }

  mem_btn() {
    $('nav ul .mem-show').toggleClass("show2");
    $('nav ul .third').toggleClass("rotate");
  }*/




}
