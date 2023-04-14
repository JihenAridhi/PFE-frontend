import {Component, OnInit} from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {Person} from "../../../entities/Person";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit{

  constructor(private ps: PersonService) {
  }

  requests: Person[] = new Array<Person>()

  ngOnInit(): void {
    //this.ps.getStatus(false).then(data => localStorage.setItem('personList', JSON.stringify(data)))
    //.subscribe(data=>Object.assign(this.requests,data))
    /*let p = localStorage.getItem('personList')
    if (p)
      this.requests = JSON.parse(p)*/
    this.requests = this.ps.getItem('personList')
  }


  delete(r: Person) {this.ps.delete(r)}

  accept(r: Person) {this.ps.accept(r)}
}
