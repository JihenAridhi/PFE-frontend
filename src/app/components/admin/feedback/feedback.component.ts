import {Component, OnInit} from '@angular/core';
import {FeedbackService} from "../../../services/feedback.service";
import {Feedback} from "../../../entities/Feedback";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{
  feedback: Feedback[] = []

  constructor(private fs: FeedbackService) {
  }

  async ngOnInit(){
    await this.fs.getAll().then(data => {if(data) this.feedback = data})
  }


}
