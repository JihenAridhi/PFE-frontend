import { Component } from '@angular/core';
import {Person} from "../../../../entities/Person";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent {
  personList: Person[] = []

  constructor() {
  }

}
