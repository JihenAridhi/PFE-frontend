import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";
@Component({
  selector: 'app-save-news',
  templateUrl: './save-news.component.html',
  styleUrls: ['./save-news.component.css']
})
export class SaveNewsComponent implements OnInit{

  news: News = new News()
  constructor(private ns: NewsService) {}

  save(form: NgForm)
  {
    let news = form.value
    news.date = new Date()
    news.id=this.news.id
    this.ns.save(news)
  }



  ngOnInit(): void {this.news = this.ns.getItem('news')}

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.news.id?.toString()+'.jpg');
    await this.ns.setPhoto(formData).then()

  }


}
