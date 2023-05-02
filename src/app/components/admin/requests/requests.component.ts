import {Component, OnInit} from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {Person} from "../../../entities/Person";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit{
  content: any
  constructor(private ps: PersonService, private ls: LanguageService) {
  }

  requests: Person[] = new Array<Person>()

  async ngOnInit() {
    this.ls.getLanguage().subscribe(data => this.content = data)
    await this.ps.getStatus(false).then(data => {if (data) this.requests = data})
  }


  delete(r: Person)
  {
    let response = confirm('are you sure ??')
    if (response) {
      this.ps.delete(r)
      this.requests = this.requests.filter(p => p!==r)
    }
  }

  accept(r: Person) {
    this.ps.accept(r)
      this.requests = this.requests.filter(p => p!==r)
  }
}
