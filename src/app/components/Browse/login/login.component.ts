import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonService} from "../../../services/person.service";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  content: any
  constructor(private ps: PersonService, private ls: LanguageService) {ls.getLanguage().subscribe(data => this.content=data)}

  login(loginF: NgForm)
  {
    this.ps.login(loginF.value)}
}
