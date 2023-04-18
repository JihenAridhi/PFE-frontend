import {Component, OnInit} from '@angular/core';
import {Event} from "../../../entities/Event";
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit{
  event = new Event()
  url = ''
  constructor(private es: EventService) {
  }
  ngOnInit(): void {
    this.event = this.es.getItem('event')
    this.es.getPhoto(this.event.id).then(data => {if (data) this.url=data})
  }

}
