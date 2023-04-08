import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {dateComparator} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";

@Component({
  selector: 'app-nav-profil',
  templateUrl: './nav-profil.component.html',
  styleUrls: ['./nav-profil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavProfilComponent implements OnInit{

  autorisation: Array<number> = new Array<number>()
  constructor(private ps: PersonService) {}

  btn() {
   $('.btn').toggleClass("click");
   $('.sidebar').toggleClass("show");
  }

  li() {$(this).addClass("active").siblings().removeClass("active");}

  ngOnInit(): void {
    this.ps.autorisations.asObservable().subscribe(data=> {
      Object.assign(this.autorisation, data)
      console.log(this.autorisation)
    })
  }
}
