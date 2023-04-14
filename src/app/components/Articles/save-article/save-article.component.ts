import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ArticleService} from "../../../services/article.service";

@Component({
  selector: 'app-save-article',
  templateUrl: './save-article.component.html',
  styleUrls: ['./save-article.component.css']
})
export class SaveArticleComponent {

  constructor(private as: ArticleService) {}

    addAuthor() {
      var survey_options = document.getElementById('survey_options');
      const newField = document.createElement('input');
      newField.setAttribute('type', 'text');
      newField.setAttribute('name', 'survey_options[]');
      newField.setAttribute('class', 'survey_options');
      newField.setAttribute('size', '50');
      newField.setAttribute('placeholder', 'Full name');
      if (survey_options)
        survey_options.appendChild(newField);
    }

    removeAuthor() {
      var survey_options = document.getElementById('survey_options');
      if(survey_options) {
        const inputTags = survey_options.getElementsByTagName('input');
        if (inputTags.length > 0) {
          survey_options.removeChild(inputTags[inputTags.length - 1]);
        }
      }
    }

  addArticle(addF: NgForm) {this.as.add(addF.value)}
}
