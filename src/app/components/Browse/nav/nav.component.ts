import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LanguageService} from "../../../services/language.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  content: any;

  constructor(private ls: LanguageService, private router: Router) {
    this.ls.getLanguage().subscribe(data => this.content=data)
  }

  changeLang(language: string) {
    this.ls.switchTo(language)
    this.ls.getLanguage().subscribe(data => this.content = data)
    window.location.reload()
  }

}
