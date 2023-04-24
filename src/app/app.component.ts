import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PersonService} from "./services/person.service";
import {LanguageService} from "./services/language.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  constructor(private ls: LanguageService) {}
  content:any
  ngOnInit(): void {this.ls.getLanguage().subscribe(data => this.content = data)}


}
