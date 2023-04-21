import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ArticleService} from "../../../services/article.service";
import {Article} from "../../../entities/Article";
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";

@Component({
  selector: 'app-save-article',
  templateUrl: './save-article.component.html',
  styleUrls: ['./save-article.component.css']
})
export class SaveArticleComponent implements OnInit{

  article: Article = new Article()
  fullName: string[] = []
  searchList: Person[] = []
  filteredList: Person[] = []
  authors: Person[] = []
  constructor(private as: ArticleService, private ps: PersonService) {}

    addAuthor() {
      this.fullName.push('')
      this.authors.push(new Person())
    }

    removeAuthor() {
        let index = this.authors.length - 1
        this.fullName.splice(index, 1)
        this.authors.splice(index, 1)

    }

  save(addF: NgForm)
  {
    let article = addF.value
    article.id = this.article.id
    article.authors = this.authors.map(r=>r.id)
    this.as.save(article)
  }

  searchAuthor(i: number)
  {
    this.filteredList = this.searchList.filter(person =>
      (person.firstName?.toLowerCase().includes(this.fullName[i].toLowerCase()) ||
      person.lastName?.toLowerCase().includes(this.fullName[i].toLowerCase()))
    )
  }

  selectPerson(person: Person)
  {
      this.authors[this.authors.length - 1] = person
      this.fullName[this.authors.length - 1] = person.firstName+' '+person.lastName
      this.searchList = this.searchList.filter(r => r!==person)
      this.filteredList = []
  }

  async ngOnInit()  {
    this.article = this.as.getItem('article')
    let person = this.ps.getItem('person')
    if (this.article.id){
      await this.as.getAuthors(this.article.id).then(
        data => {
          if (data) this.authors = data.filter(r => r.id !== person.id);
          for (let i = 0; i < this.authors.length; i++)
            this.fullName[i] = this.authors[i].firstName + ' ' + this.authors[i].lastName
        }
      )
    }
    this.authors.unshift(person)
    this.fullName.unshift(person.firstName+' '+person.lastName)
    //console.log(this.authors)
    await this.ps.getStatus(true).then(data => {if (data) {
      this.searchList = data.filter(r => !this.authors.some(a => a.id === r.id))
    }})
  }
}
