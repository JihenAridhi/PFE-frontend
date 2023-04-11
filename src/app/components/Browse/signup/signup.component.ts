import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonService} from "../../../services/person.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private ps: PersonService) {}


  addPerson(addF: NgForm) {
    if (addF.value.password != addF.value.password1)
      alert('confirm password please !!')
    else this.ps.add(addF.value)
  }
}
