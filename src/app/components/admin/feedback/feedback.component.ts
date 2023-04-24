import {Component, OnInit} from '@angular/core';
import {FeedbackService} from "../../../services/feedback.service";
import {Feedback} from "../../../entities/Feedback";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{
  feedback: Feedback[] = []
  content: any
  constructor(private fs: FeedbackService, private ls: LanguageService) {
  }

  async ngOnInit(){
    this.ls.getLanguage().subscribe(data => this.content = data)
    await this.fs.getAll().then(data => {if(data) this.feedback = data})
  }


}
