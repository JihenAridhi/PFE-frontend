import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ArticleService} from "../../../services/article.service";
import {Article} from "../../../entities/Article";
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute} from "@angular/router";

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
  constructor(private as: ArticleService, private ps: PersonService, private route: ActivatedRoute) {}

  async ngOnInit()  {
    let person = this.ps.getItem('person')
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id) {
      await this.as.get(id).then(data => this.article = data!)
      this.fullName = this.article.authors!.map(p => p.firstName + ' ' + p.lastName)
      this.article.authors = this.article.authors!.filter(r => r.id !== person.id);
    }
    await this.ps.getStatus(true).then(data => {this.searchList = data!.filter(r => !this.article.authors!.some(a => a.id === r.id) && r.id!=person.id)})
  }

    addAuthor() {
      this.fullName.push('')
      this.article.authors!.push(new Person())
    }

    removeAuthor() {
        let index = this.article.authors!.length - 1
        this.fullName.splice(index, 1)
        this.article.authors!.splice(index, 1)

    }

  save(addF: NgForm)
  {
    let article = addF.value
    article.id = this.article.id
    article.authors = this.article.authors!.map(r=>r.id)
    article.authors.push(this.ps.getItem('person').id)
    console.log(article)
    this.as.save(article)
  }

  searchAuthor(i: number)
  {
    if (this.fullName[i]=='')
      this.filteredList = []
    this.filteredList = this.searchList.filter(person =>
      (person.firstName?.toLowerCase().includes(this.fullName[i].toLowerCase()) ||
      person.lastName?.toLowerCase().includes(this.fullName[i].toLowerCase()))
    )
  }

  selectPerson(person: Person)
  {
      this.article.authors![this.article.authors!.length - 1] = person
      this.fullName[this.article.authors!.length - 1] = person.firstName+' '+person.lastName
      this.searchList = this.searchList.filter(r => r!==person)
  }

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.article.id?.toString()+file.name.substr(file.name.lastIndexOf('.')));
    await this.as.setFile(formData).then(data=>console.log(data))
  }
}
