import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";

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
    let p =localStorage.getItem('personList')
    if(p)
      this.people = JSON.parse(p)
    //this.ps.allPerson.asObservable().subscribe(data=>this.people=data)
  }

  profile(p: Person) {
    this.router.navigate(['/profile'])
    localStorage.setItem('personProfile', JSON.stringify(p))
    //this.ps.person.next(p)
  }
}
