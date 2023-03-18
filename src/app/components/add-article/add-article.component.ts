import { Component } from '@angular/core';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {

    add() {
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

    remove() {
      var survey_options = document.getElementById('survey_options');
      if(survey_options) {
        const inputTags = survey_options.getElementsByTagName('input');
        if (inputTags.length > 0) {
          survey_options.removeChild(inputTags[inputTags.length - 1]);
        }
      }
    }
/*
  private survey_options = document.getElementById('survey_options');

  add() {
    const newField = document.createElement('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'survey_options[]');
    newField.setAttribute('class', 'survey_options');
    newField.setAttribute('size', '50');
    newField.setAttribute('placeholder', 'Full name');
    if (this.survey_options)
      this.survey_options.appendChild(newField);
  }

  remove() {
    if (this.survey_options) {
      const inputTags = this.survey_options.getElementsByTagName('input');
      if (inputTags.length > 0) {
        this.survey_options.removeChild(inputTags[inputTags.length - 1]);
      }
    }
  }*/
}
