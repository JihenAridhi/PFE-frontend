import { Component } from '@angular/core';
import {Project} from "../../../entities/Project";
import {LanguageService} from "../../../services/language.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-save-project',
  templateUrl: './save-project.component.html',
  styleUrls: ['./save-project.component.css']
})
export class SaveProjectComponent {
  project: Project = new Project();
  date: any;
  content: any;

  constructor(private ls: LanguageService) {ls.getLanguage().subscribe(data => this.content=data)}

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.project.id?.toString()+'.jpg');
    //await this.ps.setPhoto(formData).then()
  }

  addproject(addF: NgForm) {

  }
}
