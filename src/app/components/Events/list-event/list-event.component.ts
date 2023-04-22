import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {Event} from "../../../entities/Event";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit{

  url: string[] = []
  eventList: Event[] = [];
  event = new Event()

  constructor(private es: EventService) {
  }
  async ngOnInit() {
    await this.es.getAll().then(async data =>
    {
      if (data)
        this.eventList = data
      for (let i = 0; i<this.eventList.length; i++)
        await this.es.getPhoto(this.eventList[i].id).then(data => {if (data) this.url[i] = data})
    })
  }
}
