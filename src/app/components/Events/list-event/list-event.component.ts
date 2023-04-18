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

  constructor(private es: EventService, private router: Router) {
  }
  ngOnInit(): void {
    this.es.getAll().then(data =>
    {
      if (data)
        this.eventList = data
      for (let i = 0; i<this.eventList.length; i++)
        this.es.getPhoto(this.eventList[i].id).then(data => {if (data) this.url[i] = data})
    })
  }

  viewEvent(e: Event) {
    this.es.setItem('event', e)
    this.router.navigate(['/view-event'])
  }
}
