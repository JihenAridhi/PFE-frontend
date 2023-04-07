import {Component, OnInit} from '@angular/core';
import {Person} from "../../entities/Person";
import {PersonService} from "../../services/person.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{

  members: Person[] = new Array<Person>()
  member: Person = new Person()
  autorisations: Array<Array<number|undefined>> = new Array<Array<number>>()

  constructor(private ps: PersonService) {}

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
      this.members = data
      for (let i=0; i<this.members.length; i++)
      {
        this.ps.getAutorisations(this.members[i])
        this.ps.autorisations.asObservable().subscribe(auto =>
        {
          console.log(auto)
          let a = new Array<number|undefined>()
          for(let j=0; j<auto.length; j++)
            a[j]=auto[j].id
          this.autorisations[i] = a
        })
      }
    }
    )
    //console.log(this.autorisations)
  }

  submit(changesF: NgForm)
  {
    console.log(changesF.value)
    let person = new Person()
    //person.id =
    person.profession = changesF.value.profession
    person.team = changesF.value.team
    //for(let i = 0; i<5; i++)
      //if (this.auto[i])
        //this.ps.addAutorisation()
  }


  delete(id: number|undefined) {this.ps.delete(id)}
}
