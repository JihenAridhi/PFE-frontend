import {Component, OnInit} from '@angular/core';
import {Person} from "../../entities/Person";
import {PersonService} from "../../services/person.service";
import {NgForm} from "@angular/forms";
import {Autorisation} from "../../entities/Autorisation";
import {AutorisationService} from "../../services/autorisation.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{

  members: Person[] = new Array<Person>()
  member: Person = new Person()
  autorisations: Array<Array<number>> = new Array<Array<number>>()

  constructor(private ps: PersonService, private as: AutorisationService) {}

  toggle(person: Person) {
    var blur=document.getElementById('blur');
     if (blur) blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    if (popup) popup.classList.toggle('active');
    this.member = person
  }

  ngOnInit(): void
  {
    this.ps.getStatus(true)
    this.ps.allPerson.asObservable().subscribe(data => {
      Object.assign(this.members, data)
      for (let i=0; i<this.members.length; i++)
      {
        console.log(this.members[i])
        this.autorisations[i] = new Array<number>()
        this.as.getAutorisations(this.members[i])
        this.as.autorisations.asObservable().subscribe(auto => {
            Object.assign(this.autorisations[i], auto)
            console.log(i+':::'+this.autorisations[i])
          }
        )
      }
      console.log('-----------------------')
    }
    )
  }

  submit(changesF: NgForm)
  {
    for(let i=0; i<this.members.length; i++)
    {
      this.members[i].profession=changesF.value[i].profession
      console.log(i+':::::'+this.members[i].profession)
    }
  }


  delete(m: Person) {this.ps.delete(m)}
}
