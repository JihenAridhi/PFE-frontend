import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  content: any;

  constructor(private http: HttpClient, private ls: LanguageService) {
    this.ls.getLanguage().subscribe(data => this.content=data)
  }

  changeLang(language: string) {
    if (language=='french')
      this.ls.toFrench()
    else
      this.ls.toEnglish()
    this.ls.getLanguage().subscribe(data => this.content = data)
  }

}
