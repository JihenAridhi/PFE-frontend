import {Component, OnInit} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {Router} from "@angular/router";
import {Person} from "../../entities/Person";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit{

  people: Person[] = new Array<Person>()
  constructor(private ps: PersonService, private router: Router) {}
  ngOnInit(): void
  {
    this.ps.getStatus(true)
    this.ps.allPerson.asObservable().subscribe(data=>this.people=data)
  }

  profile(p: Person) {
    this.router.navigate(['/profil'])
    this.ps.person.next(p)
  }
}
