import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonService} from "../../../services/person.service";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  content: any
  constructor(private ps: PersonService, private ls: LanguageService) {ls.getLanguage().subscribe(data => this.content=data)}


  addPerson(addF: NgForm) {
    if (addF.value.password != addF.value.password1)
      alert('confirm password please !!')
    else this.ps.add(addF.value)
  }
}
