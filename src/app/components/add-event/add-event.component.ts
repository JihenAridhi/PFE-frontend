import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  constructor(private es: EventService) {
  }
  addEvent(addF: NgForm) {this.es.add(addF.value)}
}
