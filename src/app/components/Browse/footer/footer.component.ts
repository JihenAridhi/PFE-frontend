import { Component } from '@angular/core';
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  content: any
  constructor(private ls: LanguageService) {ls.getLanguage().subscribe(data => this.content=data)}

}
