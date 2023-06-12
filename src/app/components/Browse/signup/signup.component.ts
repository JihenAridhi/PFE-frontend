import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonService} from "../../../services/person.service";
import {LanguageService} from "../../../services/language.service";
import {Theme} from "../../../entities/Theme";
import {ThemeService} from "../../../services/theme.service";
import {Person} from "../../../entities/Person";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {
  content: any
  themes: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false]
  themeList: Theme[] = []
  parts: HTMLElement[] = []
  selectedFiles: any;
  constructor(private ps: PersonService, private ls: LanguageService, private ts: ThemeService) {ls.getLanguage().subscribe(data => this.content=data)}

  ngOnInit() {
    this.ts.getAllThemes().then((data)=>this.themeList=data!)
    // Wait for the DOM to load before executing code
    document.addEventListener('DOMContentLoaded', () => {
      // Get the divs
      this.parts.push(document.getElementById('partA')!);
      this.parts.push(document.getElementById('partB')!);
      this.parts.push(document.getElementById('partC')!);
      this.parts.push(document.getElementById('partD')!);
    });
    this.showPart(this.parts[0])
  }

  // Function to show a specific part and hide others
  showPart(partToShow: HTMLElement){
    this.parts.forEach(part => {
      if (part === partToShow) {
        part.style.display = 'block'; // Type assertion
      } else {
        part.style.display = 'none'; // Type assertion
      }
    });
  };

  addPerson(addF: NgForm) {
    if (addF.valid) {
      if (!addF.value.password)
        alert('enter your password please !!')
      else if (addF.value.password != addF.value.password1)
        alert('confirm password please !!')
      else {
        let person: Person = addF.value
        person.themes = []
        for (let i = 0; i < 12; i++)
          if (this.themes[i])
            person.themes?.push(this.themeList[i])
        this.ps.add(person, this.selectedFiles)
      }
    }
    else alert('missing data !!!')
  }

  onFileSelected(files: FileList | null) {
    this.selectedFiles = files;
  }

}
