import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {Event} from "../../../entities/Event";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'save-add-event',
  templateUrl: './save-event.component.html',
  styleUrls: ['./save-event.component.css']
})
export class SaveEventComponent implements OnInit{

  event = new Event()
  date: any;
  content: any
  constructor(private es: EventService, private route: ActivatedRoute, private ls: LanguageService) {this.ls.getLanguage().subscribe(data => this.content=data)}
  async addEvent(addF: NgForm)
  {
    let e = addF.value
    e.id = this.event.id
    this.es.save(e);
  }

  ngOnInit(): void
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id)
      this.es.get(id).then(data => {
        this.event = data!
        this.date = new Date(this.event.date!).toISOString().substring(0, 10)
      })
  }

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.event.id?.toString()+'.jpg');
    await this.es.setPhoto(formData).then()
  }
}
