import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonService} from "../../services/person.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private ps: PersonService) {}

  login(loginF: NgForm)
  {this.ps.login(loginF.value)}
}
