import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PersonService} from "../../services/person.service";

@Component({
  selector: 'app-nav-profil',
  templateUrl: './nav-profil.component.html',
  styleUrls: ['./nav-profil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavProfilComponent implements OnInit{

  // @ts-ignore
  autorisation: Array<number|undefined>
  constructor(private ps: PersonService) {}

  btn() {
   $('.btn').toggleClass("click");
   $('.sidebar').toggleClass("show");
  }

  li() {$(this).addClass("active").siblings().removeClass("active");}

  ngOnInit(): void {
    this.ps.autorisations.asObservable().subscribe(data => {
      let auto = new Array<number|undefined>()
      for (let i=0; i<data.length; i++)
        auto[i] = data[i].id
      this.autorisation = auto

    })
  }
}
