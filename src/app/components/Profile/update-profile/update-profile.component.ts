import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {Article} from "../../../entities/Article";
import {ArticleService} from "../../../services/article.service";
import {Router} from "@angular/router";
import {LanguageService} from "../../../services/language.service";
import {ThemeService} from "../../../services/theme.service";
import {Theme} from "../../../entities/Theme";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{

  person: Person = new Person();
  url = '';
  showContent = true;
  articles: Article[] = []
  content: any
  searchList: Theme[] = []
  filteredList: Theme[] = []
  themeList: Theme[] = []

  constructor(private ps: PersonService, private as: ArticleService, private router: Router, private ts: ThemeService, private ls: LanguageService) {this.ls.getLanguage().subscribe(data => this.content=data)}

  async ngOnInit() {
    this.person = this.ps.getItem('person')
    console.log(this.person)
    this.url = this.person.photo!
    await this.as.getPersonArticles(this.person.id).then(data => {if (data) this.articles = data})
    this.ts.getAllThemes().then(data => {
      this.themeList = data!
      this.searchList = data!.filter(theme => !this.person.themes?.includes(theme))
      this.filteredList = this.searchList
    })
    this.addTheme()
  }

   toggle() {
     let blur = document.getElementById('blur');
     let popup = document.getElementById('popup');
     let popup1 = document.getElementById('popup1');
     if (blur != null && popup != null) {
       blur.classList.toggle('active');
       popup.classList.toggle('active');
     }
     if (popup1 != null && popup1.classList.contains('active')) {
       popup1.classList.remove('active');
     }
   }
    toggle1() {
    let blur=document.getElementById('blur');
    let popup = document.getElementById('popup');
    let popup1 = document.getElementById('popup1');
    if(blur!=null && popup1!=null) {
      blur.classList.toggle('active');
      popup1.classList.toggle('active');
    }
      if (popup != null && popup.classList.contains('active')) {
        popup.classList.remove('active');
      }
  }

  update() {
    this.ps.update(this.person)
    this.ps.setItem('person', this.person)
  }


  updatePass(updateP: NgForm) {
    console.log(this.person.password)
    if (updateP.value.newP.length < 8 || !/\d/.test(updateP.value.newP) || !/[a-zA-Z]/.test(updateP.value.newP)) {
      alert('Please enter a new password that is at least 8 characters long and contains both letters and numbers.');
      return; // Exit the function early
    }
    if(updateP.value.newP != updateP.value.confirmP)
      alert('please confirm your new password')
      else if (this.person.password != updateP.value.oldP)
        alert("incorrect password")
    else {
      this.person.password = updateP.value.newP
      this.ps.update(this.person)
    }
  }

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.person.id?.toString()+'.jpg');
    await this.ps.setPhoto(formData).then(data=> this.url = data + '?v=' + Math.random().toString(36).substring(2))
  }

  delete(a: Article) {
    let result = confirm('are you sure ??')
    if (result)
    {
      this.as.delete(a.id)
      this.articles = this.articles.filter(r => r!==a)
    }
  }

  addTheme() {
    this.person.themes?.push(new Theme())
  }

  removeTheme() {
    this.person.themes?.splice(this.person.themes?.length-1,1)
  }

  selectTheme(theme: Theme) {
    this.person.themes![this.person.themes!.length - 1] = theme
    this.searchList = this.searchList.filter(r => r!=theme)
  }

  searchTheme(i: number)
  {
    if (this.person.themes![i].title=='')
      this.filteredList = []
    this.filteredList = this.searchList.filter(theme => theme.title?.toUpperCase().includes(this.person.themes![i].title!.toUpperCase()))
  }
}
