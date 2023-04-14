import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {FeedbackService} from "../../../services/feedback.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private fs: FeedbackService) {
  }
  add(contactF: NgForm) {
    this.fs.add(contactF.value)
  }
}
