import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {Event} from "../../../entities/Event";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit{

  eventList: Event[] =  []

  constructor(private es: EventService) {}

  delete(e: Event)
  {
    let result = window.confirm('are you sure ?')
    if (result)
      this.es.delete(e.id)
    this.eventList = this.eventList.filter(i => i!==e)
    this.es.setItem('eventList', this.eventList)
  }

  async ngOnInit() {
    await this.es.getAll().then(data => {if (data) this.eventList = data})
  }



}
