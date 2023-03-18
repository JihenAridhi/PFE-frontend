import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-nav-profil',
  templateUrl: './nav-profil.component.html',
  styleUrls: ['./nav-profil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavProfilComponent {

 btn() {
   $('.btn').toggleClass("click");
   $('.sidebar').toggleClass("show");
  }

  feat_btn() {
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
  }

  li() {
    $(this).addClass("active").siblings().removeClass("active");
  }


}
