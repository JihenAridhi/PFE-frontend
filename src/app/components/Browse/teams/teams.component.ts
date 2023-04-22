import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {Person} from "../../../entities/Person";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  HR: Person[] = []
  Development: Person[] = []
  url: string[] = [];
  personList: Person[] = [];

  constructor(private router: Router, private prs: PersonService) {}

  ngOnInit(): void
  {

    this.prs.getStatus(true).then(data =>
    {
      if (data)
        this.personList = data
      this.personList.forEach(p => this.prs.getPhoto(p.id).then(data => {if (p.id && data) this.url[p.id] = data}))
      this.HR = this.personList.filter(r => r.team=='HR')
      this.Development = this.personList.filter(r => r.team=='Development')
    })
  }

  profile(p: Person) {
    this.router.navigate(['/profile'])
    this.prs.setItem('person', p)
  }
}
