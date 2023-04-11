import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {AutorisationService} from "../../../services/autorisation.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit{

  members: Person[] = new Array<Person>()
  member: Person = new Person()
  autoList: number[][] =  []

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

    let m = localStorage.getItem('personList')
    if (m)
      this.members = JSON.parse(m)
    let a = localStorage.getItem('allAutoList')
    if (a)
      this.autoList = JSON.parse(a)
  }

  submit(changesF: NgForm)
  {
    let f = changesF.value
    for(let i=0; i<this.members.length; i++)
    {
      this.members[i].profession=f['profession_'+i]
      this.members[i].team=f['team_'+i]
      this.ps.update(this.members[i])
      let a = [f['1_'+i], f['2_'+i], f['3_'+i], f['4_'+i], f['5_'+i]]
      console.log(a)
      for(let j=0; j<5; j++)
      {
        if (typeof a[j] === 'boolean')
        {
          console.log(a[j])
          if (a[j]) this.as.addAutorisation(this.members[i].id, j + 1)
          else this.as.deletePerson(this.members[i].id, j + 1)
        }
      }
    }
  }


  delete(m: Person) {this.ps.delete(m)}
}
