import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Person} from "../../../../entities/Person";
import {PersonService} from "../../../../services/person.service";

@Component({
  selector: 'app-teacher-researcher',
  templateUrl: './teacher-researcher.component.html',
  styleUrls: ['./teacher-researcher.component.css']
})
export class TeacherResearcherComponent implements OnInit{

  personList: Array<Person> = new Array<Person>()
  url: string[] = [];

  constructor(private router: Router, private prs: PersonService) {}

  ngOnInit(): void
  {
    this.prs.getStatus(true).then(data =>
    {
      this.personList = data!
      for (let i = 0; i<this.personList.length; i++)
        this.prs.getPhoto(this.personList[i].id).then(data => {if (data) this.url[i] = data})
    })
  }

}
