import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {FeedbackService} from "../../../services/feedback.service";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  content: any;

  constructor(private fs: FeedbackService, private ls: LanguageService) {this.ls.getLanguage().subscribe(data => this.content = data)}
  add(contactF: NgForm) {
    this.fs.add(contactF.value)
  }
}
