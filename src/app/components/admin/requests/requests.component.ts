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
    //this.requests = this.ps.getItem('personList')
    this.ps.getStatus(false).then(data => {if (data) this.requests = data})
  }


  delete(r: Person)
  {
    let response = confirm('are you sure ??')
    if (response) {
      this.ps.delete(r)
      this.requests = this.requests.filter(p => p!==r)
      this.ps.setItem('personList', this.requests)
    }
  }

  accept(r: Person) {
    this.ps.accept(r)
      this.requests = this.requests.filter(p => p!==r)
      this.ps.setItem('personList', this.requests)
  }
}
