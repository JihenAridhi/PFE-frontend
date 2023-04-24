import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {Event} from "../../../entities/Event";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit{
  content: any
  eventList: Event[] =  []

  constructor(private es: EventService, private ls: LanguageService) {ls.getLanguage().subscribe(data => this.content=data)}

  delete(e: Event)
  {
    let result = window.confirm('are you sure ?')
    if (result) {
      this.es.delete(e.id)
      this.eventList = this.eventList.filter(i => i !== e)
    }
  }

  async ngOnInit() {
    await this.es.getAll().then(data => {if (data) this.eventList = data})
  }



}
