import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";
import {ActivatedRoute} from "@angular/router";
import {LanguageService} from "../../../services/language.service";
@Component({
  selector: 'app-save-news',
  templateUrl: './save-news.component.html',
  styleUrls: ['./save-news.component.css']
})
export class SaveNewsComponent implements OnInit{

  news: News = new News()
  content: any;
  constructor(private ns: NewsService, private route: ActivatedRoute, private ls: LanguageService) {this.ls.getLanguage().subscribe(data => this.content=data)}

  save(form: NgForm)
  {
    let news = form.value
    news.date = new Date()
    news.id=this.news.id
    this.ns.save(news)
  }



  ngOnInit(): void
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id)
      this.ns.get(id).then(data => this.news=data!)
  }

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.news.id?.toString()+'.jpg');
    await this.ns.setPhoto(formData).then()

  }


}
