import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {Article} from "../../../entities/Article";
import {ArticleService} from "../../../services/article.service";
import {Router} from "@angular/router";
import {LanguageService} from "../../../services/language.service";

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

  constructor(private ps: PersonService, private as: ArticleService, private router: Router, private ls: LanguageService) {this.ls.getLanguage().subscribe(data => this.content=data)}

   toggle() {
     let blur = document.getElementById('blur');
     let popup = document.getElementById('popup');
     if (blur != null && popup != null) {
       blur.classList.toggle('active');
       popup.classList.toggle('active');
     }
   }
    toggle1() {
    let blur=document.getElementById('blur');
     let popup1 = document.getElementById('popup1');
    if(blur!=null && popup1!=null) {
      blur.classList.toggle('active');
      popup1.classList.toggle('active');
    }
  }

  async ngOnInit() {
    this.person = this.ps.getItem('person')
    this.url = this.person.photo!
    //await this.ps.getPhoto(this.person.id).then(data => {if (data) this.url = data})
    await this.as.getPersonArticles(this.person.id).then(data => {if (data) this.articles = data})
  }

  update(updateF: NgForm) {
    this.person.firstName = updateF.value.firstName
    this.person.lastName = updateF.value.lastName
    this.person.email = updateF.value.email
    this.person.interest = updateF.value.interest

    this.ps.update(this.person)
    this.ps.setItem('person', this.person)
    alert('your information have been updated successfully !!')
  }


  updatePass(updateP: NgForm) {
    if(updateP.value.newP !=updateP.value.confirmP)
      alert('please confirm your new password')
    else {
      this.person.password = updateP.value.newP
      this.ps.update(this.person)
      alert('your information have been updated successfully !!')
    }
  }

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.person.id?.toString()+'.jpg');
    await this.ps.setPhoto(formData).then(data=>
    {
      this.url = data + '?v=' + Math.random().toString(36).substring(2);
      console.log(this.url)
    })
    /*await this.ps.getPhoto(this.person.id).then(data=>
    {
      this.url = data + '?v=' + Math.random().toString(36).substring(2);
      console.log(this.url)
    })*/
  }

  delete(a: Article) {
    let result = confirm('are you sure ??')
    if (result)
    {
      this.as.delete(a.id)
      this.articles = this.articles.filter(r => r!==a)
    }
  }
}
