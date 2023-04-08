import {Component, OnInit} from '@angular/core';
import {Person} from "../../entities/Person";
import {PersonService} from "../../services/person.service";
import {NgForm} from "@angular/forms";
import {Autorisation} from "../../entities/Autorisation";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{

  members: Person[] = new Array<Person>()
  member: Person = new Person()
  autorisations: Array<Array<number>> = new Array<Array<number>>()

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
      Object.assign(this.members, data)
      for (let i=0; i<this.members.length; i++)
      {
        console.log(this.members[i])
        this.autorisations[i] = new Array<number>()
        this.ps.getAutorisations(this.members[i]).subscribe(
          (auto: Autorisation[]) =>
          {
            let a = new Array<number>()
            for (let i=0; i<auto.length; i++)
              a[i]=auto[i].id
              Object.assign(this.autorisations[i],a)
          })
      }
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
